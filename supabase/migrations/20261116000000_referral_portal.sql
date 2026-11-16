begin;

create table if not exists public.referral_users (
  id text primary key,
  name text not null,
  email text not null,
  role text not null check (role in ('admin', 'partner', 'sales', 'finance')),
  status text not null check (status in ('active', 'invited', 'suspended')),
  created_at timestamptz not null default now()
);
alter table public.referral_users add column if not exists auth_user_id uuid references auth.users(id) on delete set null;
create unique index if not exists referral_users_auth_id_key on public.referral_users (auth_user_id);
-- Link existing accounts explicitly after reviewing the Supabase Auth identities.

create table if not exists public.referral_partner_profiles (
  id text primary key,
  user_id text not null references public.referral_users(id),
  partner_code text not null,
  phone text not null,
  company_name text not null,
  payout_details jsonb not null,
  terms_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists referral_profiles_user_key on public.referral_partner_profiles (user_id);

create table if not exists public.referral_records (
  id text primary key,
  partner_id text not null references public.referral_users(id),
  partner_name text not null,
  partner_email text not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  company_name text,
  city text,
  customer_notes text,
  referral_type text not null check (referral_type in ('catalogue', 'custom')),
  product_id text,
  product_name_snapshot text,
  custom_project_title text,
  custom_project_description text,
  expected_timeline text,
  currency text not null default 'INR',
  proposed_quote_amount numeric(12,2) not null,
  proposed_commission_type text not null,
  proposed_commission_value numeric(12,2) not null,
  proposed_indicative_commission numeric(12,2) not null,
  pricing_notes text,
  approved_quote_amount numeric(12,2),
  approved_commission_type text,
  approved_commission_value numeric(12,2),
  approved_indicative_commission numeric(12,2),
  internal_admin_notes text,
  customer_facing_notes text,
  assigned_sales_owner text,
  deal_status text not null,
  commission_status text not null,
  submitted_at timestamptz not null,
  approved_at timestamptz,
  created_at timestamptz not null,
  updated_at timestamptz not null
);
create index if not exists referral_records_partner_idx on public.referral_records (partner_id, created_at);
create index if not exists referral_records_email_idx on public.referral_records (lower(trim(customer_email)));
create index if not exists referral_records_phone_idx on public.referral_records (right(regexp_replace(customer_phone, '[^0-9]', '', 'g'), 10));

create table if not exists public.referral_payments (
  id text primary key,
  referral_id text not null references public.referral_records(id),
  amount_received numeric(12,2) not null check (amount_received > 0),
  currency text not null,
  received_at timestamptz not null,
  payment_reference text not null,
  verified_by text,
  verified_at timestamptz,
  status text not null,
  created_at timestamptz not null default now()
);
create index if not exists referral_payment_referral_idx on public.referral_payments (referral_id);
create index if not exists referral_payment_reference_idx on public.referral_payments (lower(trim(payment_reference)));

create table if not exists public.referral_payouts (
  id text primary key,
  partner_id text not null references public.referral_users(id),
  partner_name text not null,
  amount numeric(12,2) not null check (amount > 0),
  currency text not null,
  payment_method text not null,
  transaction_reference text not null,
  paid_at timestamptz not null,
  recorded_by text not null,
  note text,
  created_at timestamptz not null default now()
);
create index if not exists referral_payout_partner_idx on public.referral_payouts (partner_id);
create index if not exists referral_payout_reference_idx on public.referral_payouts (lower(trim(transaction_reference)));

create table if not exists public.referral_commission_ledger (
  id text primary key,
  referral_id text not null,
  partner_id text not null references public.referral_users(id),
  partner_name text not null,
  customer_name text not null,
  entry_type text not null,
  amount numeric(12,2) not null,
  currency text not null,
  basis_amount numeric(12,2),
  commission_rate_or_fixed text,
  reference_id text,
  note text,
  created_by text not null,
  created_at timestamptz not null default now()
);
create index if not exists referral_ledger_partner_idx on public.referral_commission_ledger (partner_id, referral_id);

create table if not exists public.referral_activities (
  id text primary key,
  referral_id text not null references public.referral_records(id),
  actor_name text not null,
  actor_role text not null,
  action text not null,
  note text,
  created_at timestamptz not null default now()
);
create index if not exists referral_activities_record_idx on public.referral_activities (referral_id);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'referral_users', 'referral_partner_profiles', 'referral_records', 'referral_payments',
    'referral_payouts', 'referral_commission_ledger', 'referral_activities'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on public.%I from public, anon, authenticated', table_name);
    execute format('grant select, insert, update, delete on public.%I to service_role', table_name);
  end loop;
end;
$$;

create or replace function public.referral_create_partner(
  p_auth_id uuid, p_name text, p_email text, p_phone text, p_company text
) returns void language plpgsql set search_path = '' as $$
declare
  account_id text := 'PTR-' || gen_random_uuid()::text;
begin
  perform pg_advisory_xact_lock(hashtextextended('referral-user:' || lower(trim(p_email)), 0));
  if exists (select 1 from public.referral_users where lower(trim(email)) = lower(trim(p_email))) then
    raise exception 'This email already has a portal account.';
  end if;
  insert into public.referral_users (id, auth_user_id, name, email, role, status)
  values (account_id, p_auth_id, p_name, p_email, 'partner', 'active');

  insert into public.referral_partner_profiles
    (id, user_id, partner_code, phone, company_name, payout_details)
  values ('PROF-' || gen_random_uuid()::text, account_id, account_id, p_phone, p_company,
    jsonb_build_object('method', 'bank_transfer'));
end;
$$;

create or replace function public.referral_save_profile(
  p_user_id text, p_company text, p_phone text, p_payout_details jsonb
) returns void language plpgsql set search_path = '' as $$
begin
  if not exists (select 1 from public.referral_users where id = p_user_id and role = 'partner') then
    raise exception 'Partner not found.';
  end if;
  insert into public.referral_partner_profiles
    (id, user_id, partner_code, phone, company_name, payout_details)
  values ('PROF-' || gen_random_uuid()::text, p_user_id, p_user_id, p_phone, p_company, p_payout_details)
  on conflict (user_id) do update set phone = excluded.phone, company_name = excluded.company_name,
    payout_details = excluded.payout_details, updated_at = clock_timestamp();
end;
$$;

create or replace function public.referral_has_duplicate(p_phone text, p_email text)
returns boolean language sql stable set search_path = '' as $$
  with contact as (select regexp_replace(p_phone, '[^0-9]', '', 'g') as phone, lower(trim(p_email)) as email)
  select exists (
    select 1 from public.referral_records r cross join contact c
    where (c.email <> '' and lower(trim(r.customer_email)) = c.email)
       or (length(c.phone) >= 10 and right(regexp_replace(r.customer_phone, '[^0-9]', '', 'g'), 10) = right(c.phone, 10))
  )
$$;

create or replace function public.referral_submit(p_record jsonb)
returns public.referral_records language plpgsql set search_path = '' as $$
declare
  record public.referral_records := jsonb_populate_record(null::public.referral_records, p_record);
  duplicate_found boolean;
  phone_key text := right(regexp_replace(record.customer_phone, '[^0-9]', '', 'g'), 10);
begin
  perform pg_advisory_xact_lock(hashtextextended('referral-email:' || record.customer_email, 0));
  perform pg_advisory_xact_lock(hashtextextended('referral-phone:' || phone_key, 0));
  duplicate_found := public.referral_has_duplicate(record.customer_phone, record.customer_email);
  insert into public.referral_records (
    id, partner_id, partner_name, partner_email, customer_name, customer_phone, customer_email, company_name, city,
    customer_notes, referral_type, product_id, product_name_snapshot, custom_project_title, custom_project_description,
    expected_timeline, currency, proposed_quote_amount, proposed_commission_type, proposed_commission_value,
    proposed_indicative_commission, pricing_notes, deal_status, commission_status, submitted_at, created_at, updated_at
  ) values (
    record.id, record.partner_id, record.partner_name, record.partner_email, record.customer_name, record.customer_phone,
    record.customer_email, record.company_name, record.city, record.customer_notes, record.referral_type, record.product_id,
    record.product_name_snapshot, record.custom_project_title, record.custom_project_description, record.expected_timeline,
    record.currency, record.proposed_quote_amount, record.proposed_commission_type, record.proposed_commission_value,
    record.proposed_indicative_commission, record.pricing_notes, record.deal_status, record.commission_status,
    record.submitted_at, record.created_at, record.updated_at
  ) returning * into record;
  insert into public.referral_activities (id, referral_id, actor_name, actor_role, action, note)
  values ('ACT-' || gen_random_uuid()::text, record.id, record.partner_name, 'partner', 'Referral Submitted',
    case when duplicate_found then 'Possible duplicate contact. Review before approval.' end);
  return record;
end;
$$;

create or replace function public.referral_change(
  p_id text, p_expected timestamptz, p_updates jsonb, p_actor_name text, p_actor_role text, p_action text, p_note text
) returns public.referral_records language plpgsql set search_path = '' as $$
declare
  current_referral public.referral_records;
  updated public.referral_records;
begin
  select * into current_referral from public.referral_records where id = p_id for update;
  -- The caller read a JavaScript-compatible timestamp from PostgREST without converting it to Date.
  if not found or current_referral.updated_at is distinct from p_expected then
    raise exception 'The referral changed. Reload it and try again.';
  end if;
  updated := jsonb_populate_record(current_referral, p_updates);
  update public.referral_records set
    proposed_quote_amount = updated.proposed_quote_amount,
    proposed_commission_type = updated.proposed_commission_type,
    proposed_commission_value = updated.proposed_commission_value,
    proposed_indicative_commission = updated.proposed_indicative_commission,
    pricing_notes = updated.pricing_notes,
    approved_quote_amount = updated.approved_quote_amount,
    approved_commission_type = updated.approved_commission_type,
    approved_commission_value = updated.approved_commission_value,
    approved_indicative_commission = updated.approved_indicative_commission,
    internal_admin_notes = updated.internal_admin_notes,
    customer_facing_notes = updated.customer_facing_notes,
    assigned_sales_owner = updated.assigned_sales_owner,
    deal_status = updated.deal_status,
    commission_status = updated.commission_status,
    approved_at = updated.approved_at,
    updated_at = clock_timestamp()
  where id = p_id returning * into updated;

  insert into public.referral_activities (id, referral_id, actor_name, actor_role, action, note)
  values ('ACT-' || gen_random_uuid()::text, p_id, p_actor_name, p_actor_role, p_action, p_note);
  return updated;
end;
$$;

create or replace function public.referral_record_payment(
  p_referral_id text, p_amount numeric, p_reference text, p_received_at timestamptz, p_actor text
) returns jsonb language plpgsql set search_path = '' as $$
declare
  deal public.referral_records;
  payment public.referral_payments;
  account_id text;
  receipt_total numeric;
  target_earnings numeric;
  existing_earnings numeric;
  paid numeric;
  earned numeric := 0;
  now_at timestamptz := clock_timestamp();
begin
  if p_amount is null or p_amount <= 0 or p_amount <> round(p_amount, 2) then
    raise exception 'Enter a positive qualifying payment amount with up to two decimal places.';
  end if;
  select partner_id into account_id from public.referral_records where id = p_referral_id;
  if not found then raise exception 'Referral not found.'; end if;

  perform 1 from public.referral_users where id = account_id for update;
  perform pg_advisory_xact_lock(hashtextextended('referral-payment:' || lower(trim(p_reference)), 0));
  select * into deal from public.referral_records where id = p_referral_id for update;
  if deal.deal_status <> 'won' or deal.approved_quote_amount is null
    or deal.approved_commission_type is null or deal.approved_commission_type not in ('fixed', 'percentage')
    or deal.approved_commission_value is null then
    raise exception 'A verified payment requires a won referral with approved terms.';
  end if;
  if exists (select 1 from public.referral_payments where lower(trim(payment_reference)) = lower(trim(p_reference))) then
    raise exception 'This payment reference has already been recorded.';
  end if;

  insert into public.referral_payments (
    id, referral_id, amount_received, currency, received_at, payment_reference, verified_by, verified_at, status, created_at
  ) values (
    'PAY-' || gen_random_uuid()::text, deal.id, p_amount, deal.currency, p_received_at, p_reference, p_actor, now_at, 'verified', now_at
  ) returning * into payment;

  select coalesce(sum(amount_received), 0) into receipt_total
  from public.referral_payments where referral_id = deal.id and status = 'verified';
  select coalesce(sum(amount) filter (where entry_type = 'earned'), 0),
         coalesce(-sum(amount) filter (where entry_type = 'payout'), 0)
  into existing_earnings, paid from public.referral_commission_ledger where referral_id = deal.id;
  target_earnings := case when deal.approved_commission_type = 'fixed'
    then round(deal.approved_commission_value * least(1, receipt_total / deal.approved_quote_amount), 2)
    else round(receipt_total * deal.approved_commission_value / 100, 2) end;
  earned := greatest(0, target_earnings - existing_earnings);

  if earned > 0 then
    insert into public.referral_commission_ledger (
      id, referral_id, partner_id, partner_name, customer_name, entry_type, amount, currency,
      basis_amount, commission_rate_or_fixed, reference_id, created_by, created_at
    ) values (
      'LED-' || gen_random_uuid()::text, deal.id, deal.partner_id, deal.partner_name, deal.customer_name,
      'earned', earned, deal.currency, p_amount, deal.approved_commission_value::text ||
      case when deal.approved_commission_type = 'percentage' then '%' else ' fixed' end, payment.id, p_actor, now_at
    );
    update public.referral_records set commission_status = case
      when deal.commission_status = 'on_hold' then 'on_hold'
      when paid >= existing_earnings + earned then 'paid'
      when paid > 0 then 'partially_paid'
      else 'earned'
    end, updated_at = clock_timestamp() where id = deal.id;
  end if;

  insert into public.referral_activities (id, referral_id, actor_name, actor_role, action, created_at)
  values ('ACT-' || gen_random_uuid()::text, deal.id, p_actor, 'admin', 'Customer Payment Recorded', now_at);
  return jsonb_build_object('payment', to_jsonb(payment), 'earned', earned);
end;
$$;

create or replace function public.referral_record_payout(
  p_partner_id text, p_referral_id text, p_amount numeric, p_method text, p_reference text,
  p_paid_at timestamptz, p_note text, p_actor text
) returns public.referral_payouts language plpgsql set search_path = '' as $$
declare
  partner public.referral_users;
  payout public.referral_payouts;
  deal record;
  available numeric;
  remaining numeric := p_amount;
  allocated numeric;
  now_at timestamptz := clock_timestamp();
begin
  if p_amount is null or p_amount <= 0 or p_amount <> round(p_amount, 2) then
    raise exception 'Enter a positive payout amount with up to two decimal places.';
  end if;
  select * into partner from public.referral_users where id = p_partner_id and role = 'partner' for update;
  if not found then raise exception 'Partner not found.'; end if;
  perform pg_advisory_xact_lock(hashtextextended('referral-payout:' || lower(trim(p_reference)), 0));
  if exists (select 1 from public.referral_payouts where lower(trim(transaction_reference)) = lower(trim(p_reference))) then
    raise exception 'This payout reference has already been recorded.';
  end if;

  select coalesce(sum(amount), 0) into available from public.referral_commission_ledger
  where partner_id = p_partner_id and currency = 'INR';
  if p_amount > available then raise exception 'The payout exceeds the available commission balance.'; end if;

  insert into public.referral_payouts (
    id, partner_id, partner_name, amount, currency, payment_method, transaction_reference, paid_at, recorded_by, note, created_at
  ) values (
    'POUT-' || gen_random_uuid()::text, partner.id, partner.name, p_amount, 'INR', p_method, p_reference, p_paid_at, p_actor, p_note, now_at
  ) returning * into payout;

  -- Partner-wide payouts settle the oldest outstanding eligible referrals first.
  for deal in
    select r.id, r.customer_name, balances.available
    from public.referral_records r
    cross join lateral (
      select sum(l.amount) as available from public.referral_commission_ledger l
      where l.referral_id = r.id and l.partner_id = partner.id and l.currency = payout.currency
    ) balances
    where r.partner_id = partner.id and r.deal_status = 'won' and r.currency = payout.currency
      and r.commission_status in ('earned', 'partially_paid', 'paid')
      and (p_referral_id is null or r.id = p_referral_id) and balances.available > 0
    order by r.submitted_at, r.id
    for update of r
  loop
    allocated := least(remaining, deal.available);
    insert into public.referral_commission_ledger (
      id, referral_id, partner_id, partner_name, customer_name, entry_type, amount, currency, reference_id, note, created_by, created_at
    ) values (
      'LED-' || gen_random_uuid()::text, deal.id, partner.id, partner.name, deal.customer_name, 'payout',
      -allocated, payout.currency, payout.id, null, p_actor, now_at
    );
    update public.referral_records set commission_status = case when allocated = deal.available then 'paid' else 'partially_paid' end,
      updated_at = clock_timestamp() where id = deal.id;
    insert into public.referral_activities (id, referral_id, actor_name, actor_role, action, created_at)
    values ('ACT-' || gen_random_uuid()::text, deal.id, p_actor, 'admin', 'Commission Payout Recorded', now_at);
    remaining := remaining - allocated;
    exit when remaining = 0;
  end loop;
  if remaining > 0 then raise exception 'The payout exceeds the eligible outstanding balance for the selected referrals.'; end if;
  return payout;
end;
$$;

revoke all on function public.referral_create_partner(uuid, text, text, text, text),
  public.referral_save_profile(text, text, text, jsonb), public.referral_has_duplicate(text, text),
  public.referral_submit(jsonb), public.referral_change(text, timestamptz, jsonb, text, text, text, text),
  public.referral_record_payment(text, numeric, text, timestamptz, text),
  public.referral_record_payout(text, text, numeric, text, text, timestamptz, text, text)
from public, anon, authenticated;
grant execute on function public.referral_create_partner(uuid, text, text, text, text),
  public.referral_save_profile(text, text, text, jsonb), public.referral_has_duplicate(text, text),
  public.referral_submit(jsonb), public.referral_change(text, timestamptz, jsonb, text, text, text, text),
  public.referral_record_payment(text, numeric, text, timestamptz, text),
  public.referral_record_payout(text, text, numeric, text, text, timestamptz, text, text)
to service_role;

commit;
