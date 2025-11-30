// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllInventory } from "@/lib/inventory";

export const metadata: Metadata = {
  title: "AUTO COLLECTION BANDAGE | Digital Garage",
  description:
    "AUTO COLLECTION BANDAGEのデジタルガレージ。ハイパーカーから実用車まで、同じ温度で並べた在庫と世界観を届けます。",
};

export default function HomePage() {
  const cars = getAllInventory();
  const inStockCount = cars.filter((car) => car.status === "stock").length;
  const soldCount = cars.filter((car) => car.status === "sold").length;

  return (
    <main className="relative min-h-screen bg-black text-neutral-100">
      {/* 四隅のナビゲーションフレーム */}
      <div className="pointer-events-none fixed inset-0 flex flex-col justify-between px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between text-[11px] tracking-[0.24em] uppercase text-neutral-500">
          <span className="pointer-events-auto">
            AUTO COLLECTION{" "}
            <span className="font-semibold text-neutral-200">BANDAGE</span>
          </span>
          <span className="pointer-events-auto hidden sm:inline">
            DIGITAL GARAGE
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] tracking-[0.24em] text-neutral-600">
          <span className="pointer-events-auto">
            LOCATION: TOTTORI,JAPAN
          </span>
          <Link
            href="/inventory"
            className="pointer-events-auto rounded-full border border-neutral-700/80 bg-neutral-950/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-200 hover:border-neutral-500 hover:bg-neutral-900/80"
          >
            PIT IN→ INVENTORY
          </Link>
        </div>
      </div>

      {/* 中央コンテンツ */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-8 px-4 pb-20 pt-24 sm:px-6 sm:pt-28">
        {/* 上段: ヒーロー＋タブ */}
        <section className="flex flex-col gap-6 sm:flex-row sm:items-stretch">
          {/* ヒーローカード */}
          <div className="flex-1 rounded-3xl border border-neutral-800/90 bg-gradient-to-br from-neutral-950 via-black to-[#130909] p-[1px] shadow-[0_0_60px_rgba(0,0,0,0.7)]">
            <div className="flex h-full flex-col justify-between rounded-[22px] bg-gradient-to-b from-black/90 via-black/80 to-neutral-950 px-5 py-6 sm:px-7 sm:py-7">
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                  Digital Independence
                </p>
                <h1 className="text-2xl font-semibold leading-snug sm:text-3xl">
                  夜のガレージと
                  <br className="hidden sm:block" />
                  昼の生活のあいだにある場所。
                </h1>
                <p className="text-xs leading-relaxed text-neutral-300 sm:text-sm">
                  ブガッティを眺める夜も、実用車で生活を回す日常も、同じ1枚のWEBで完結させるためのデジタルガレージ。
                  AUTO COLLECTION BANDAGEは、そのまま商品ページになる在庫リストと、世界観を崩さないビジュアルで組み上げます。
                </p>
              </div>

              {/* 在庫サマリー */}
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-neutral-400">
                <span className="rounded-full border border-neutral-800 bg-black/70 px-3 py-1">
                  在庫あり:{inStockCount}台
                </span>
                <span className="rounded-full border border-neutral-800 bg-black/70 px-3 py-1">
                  商談成約済:{soldCount}台
                </span>
              </div>
            </div>
          </div>

          {/* タブ風ショートカット */}
          <div className="flex w-full flex-col gap-3 sm:w-48 sm:min-w-[11rem]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-neutral-500">
              Quick Access
            </div>
            <div className="flex flex-col gap-2 text-[11px] text-neutral-300">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-between rounded-full border border-neutral-800 bg-black/80 px-3 py-2 hover:border-neutral-500 hover:bg-neutral-900/80"
              >
                <span className="uppercase tracking-[0.16em]">
                  在庫車一覧
                </span>
                <span className="text-[9px] text-neutral-500">View</span>
              </Link>
              <button
                type="button"
                className="inline-flex cursor-default items-center justify-between rounded-full border border-neutral-800 bg-black/60 px-3 py-2 text-left hover:border-neutral-600/80 hover:bg-neutral-900/60"
              >
                <span className="uppercase tracking-[0.16em]">
                  輸入車と国産車
                </span>
                <span className="text-[9px] text-neutral-500">Filter</span>
              </button>
              <button
                type="button"
                className="inline-flex cursor-default items-center justify-between rounded-full border border-neutral-800 bg-black/60 px-3 py-2 text-left hover:border-neutral-600/80 hover:bg-neutral-900/60"
              >
                <span className="uppercase tracking-[0.16em]">
                  Coming Soon
                </span>
                <span className="text-[9px] text-neutral-500">Teaser</span>
              </button>
            </div>
          </div>
        </section>

        {/* 下段: コンセプトの補足 */}
        <section className="grid gap-4 text-xs text-neutral-300 sm:grid-cols-3 sm:text-[11px]">
          <div className="rounded-2xl border border-neutral-800 bg-black/70 p-4">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              01 FORMAT
            </p>
            <p className="leading-relaxed">
              どの在庫車も、同じフォーマットとトーンで撮影された画像とテキストで並べることで、ガレージとしての統一感を優先します。
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-black/70 p-4">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              02 VISUAL
            </p>
            <p className="leading-relaxed">
              過度なレタッチや誇張は避け、実際の中古車在庫として成立するリアルさと、ハイエンドな世界観の両立を狙います。
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-black/70 p-4">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              03 FLOW
            </p>
            <p className="leading-relaxed">
              トップ→在庫一覧→詳細→問い合わせまでの導線をシンプルに保ちつつ、途中で世界観が途切れないようにレイアウトを揃えます。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
