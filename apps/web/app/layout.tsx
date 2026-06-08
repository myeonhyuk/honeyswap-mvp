import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import TopNav from "../components/TopNav";

export const metadata: Metadata = {
  title: "골프마켓",
  description: "골프마켓 앱 소개"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="topbar-inner">
            <button className="gm-hamburger" aria-label="전체 메뉴">≡&nbsp;메뉴</button>
            <Link href="/" className="logo">
              골프마켓
            </Link>
            <TopNav />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
