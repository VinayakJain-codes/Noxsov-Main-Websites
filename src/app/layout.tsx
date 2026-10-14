import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { BackToTop } from "@/components/ui/BackToTop";
import { CookieConsentBanner } from "@/components/cookies/CookieConsentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NOXSOV — The Sovereign Enterprise Software Platform & Store",
    template: "%s | NOXSOV",
  },
  description:
    "NOXSOV is the sovereign enterprise software platform & store engineering mission-critical systems across Security Solutions, Finance, and IT Solutions with zero per-user SaaS taxes.",
  metadataBase: new URL("https://noxsov.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/noxsov-logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "NOXSOV — The Sovereign Enterprise Software Platform & Store",
    description:
      "Autonomous security, automated corporate finance, and high-concurrency enterprise IT solutions with instant cryptographic licensing.",
    siteName: "NOXSOV",
    type: "website",
    images: [
      {
        url: "/NOXSOV LOGO.jpeg",
        width: 800,
        height: 800,
        alt: "NOXSOV Sovereign Enterprise Software",
      },
      {
        url: "/noxsov-logo.png",
        width: 512,
        height: 512,
        alt: "NOXSOV Logo Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOXSOV — The Sovereign Enterprise Software Platform",
    description: "Autonomous security, automated corporate finance, and high-concurrency IT operations.",
    images: ["/NOXSOV LOGO.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth light`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('noxsov-theme');
                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#06090e] text-slate-900 dark:text-neutral-100 selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-200">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
            <BackToTop />
            <CookieConsentBanner />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
