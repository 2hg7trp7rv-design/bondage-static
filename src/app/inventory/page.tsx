// src/app/inventory/page.tsx
import type { Metadata } from "next";
import { getAllInventory } from "@/lib/inventory";
import { InventoryListClient } from "./InventoryListClient";

export const metadata: Metadata = {
  title: "在庫車一覧 | Auto Collection BANDAGE",
  description:
    "Auto Collection BANDAGE の在庫車一覧。軽自動車からスーパーカーまで、現在取り扱い中の在庫車をまとめて確認できます。",
};

export default function InventoryPage() {
  const cars = getAllInventory();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-20 pt-8">
      {/* タイトル + 概要 */}
      <section className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Inventory
        </p>
        <h1 className="text-2xl font-semibold sm:text-3xl">在庫車一覧</h1>
        <p className="text-sm leading-relaxed text-neutral-300">
          コンパクトカーからスーパーカーまで、
          現在取り扱い中の在庫車を一覧で確認できます。
        </p>
      </section>

      {/* 在庫リスト本体（ソートタブ含むクライアントコンポーネント） */}
      <InventoryListClient cars={cars} />
    </div>
  );
}
