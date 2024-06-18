import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RSC Infinite Scroll Example",
  description: "React Server Components Infinite Scroll Example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className="bg-slate-200 py-6 px-4 text-3xl sticky top-0"
          style={{ opacity: 0.9 }}
        >
          React Server Components <strong>Infinite Scroll Example</strong>
        </div>
        {children}
      </body>
    </html>
  );
}
