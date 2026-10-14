import { NextRequest, NextResponse } from "next/server";
import { createOrderRecord, getOrderById, getAllOrders } from "@/lib/store/db";
import { CartItem, OrderCustomerInfo } from "@/types/store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");

    if (orderId) {
      const order = getOrderById(orderId);
      if (!order) {
        return NextResponse.json(
          { success: false, error: "Order not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, order });
    }

    const orders = getAllOrders();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to retrieve orders",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, discountCode, paymentMethod } = body as {
      customer: OrderCustomerInfo;
      items: CartItem[];
      discountCode?: string;
      paymentMethod?: "enterprise_po" | "corporate_card" | "wire_transfer";
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty. Please add items before checking out." },
        { status: 400 }
      );
    }

    if (!customer?.companyName || !customer?.email) {
      return NextResponse.json(
        { success: false, error: "Company name and administrator email are required." },
        { status: 400 }
      );
    }

    const order = createOrderRecord({
      customer,
      items,
      discountCode,
      paymentMethod: paymentMethod || "corporate_card",
    });

    return NextResponse.json({
      success: true,
      message: "Order placed successfully. Sovereign license keys generated.",
      order,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process order checkout",
      },
      { status: 500 }
    );
  }
}
