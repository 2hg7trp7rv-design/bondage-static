import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "Auto Collection Bondage | Bondage Digital Independence",
  description:
    "鳥取県米子市の自動車販売店 Auto Collection Bondage。軽トラからフェラーリまで、夜の優雅さと昼の温もりが同居するガレージ型ショールーム。",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-[#0a0a0a] text-neutral-100 antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
