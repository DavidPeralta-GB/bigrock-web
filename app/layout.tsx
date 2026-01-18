import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  CookieConsentProvider,
  CookieConsentBanner,
  CookieSettingsModal,
} from "@/components/cookie-consent";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TS@BigRock - Professional Timesheet Management",
  description: "The only timesheet management app you need. Track time, manage approvals, and streamline your workforce with our professional solution.",
  icons: {
    icon: [
      { url: "/favicon-16-filled-blue-dark.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32-filled-blue-dark.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <ThemeProvider>
          <CookieConsentProvider>
            {children}
            <CookieConsentBanner />
            <CookieSettingsModal />
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
