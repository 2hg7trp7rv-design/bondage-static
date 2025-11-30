// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllInventory } from "@/lib/inventory";

export const metadata: Metadata = {
  title: "AUTO COLLECTION Bondage | 在庫車トップ",
  description:
    "AUTO COLLECTION Bondage の在庫車一覧とショップ概要をまとめたトップページ",
};

export default function HomePage() {
  const cars = getAllInventory();
  const featured = cars[0];

  const featuredName =
    featured &&
    [featured.maker, featured.model, featured.grade]
      .filter(Boolean)
      .join(" ");

  const featuredPriceLabel =
    featured && featured.priceYen != null
      ? `￥${Intl.NumberFormat("ja-JP").format(Number(featured.priceYen))}`
      : undefined;

  return (
    <main className="min-h-screen bg-[#050507] text-neutral-50">
      {/* ── HERO（紙の1枚目イメージ） ─────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* 背景写真（/public/images/hero.jpg を想定） */}
        <div className="pointer-events-none absolute inset-0">
          <div className="h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-4 pb-16 pt-12 text-center md:min-h-[70vh] md:pb-20 md:pt-16">
          <div className="text-[11px] font-medium tracking-[0.28em] text-neutral-300/85 md:text-xs">
            AUTO COLLECTION
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-[0.14em] text-neutral-50 md:text-5xl lg:text-6xl">
            <span className="font-serif italic">Bondage</span>
          </h1>

          <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-neutral-200/90 md:text-sm">
            夜のガレージと昼の生活のあいだにある場所。まずはこの1枚から、
            在庫車と世界観を覗いてください。
          </p>

          <div className="mt-9">
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-10 py-3 text-sm font-semibold tracking-[0.2em] text-white shadow-[0_0_32px_rgba(239,68,68,0.8)] transition hover:bg-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,1)]"
            >
              在庫車一覧
            </Link>
          </div>
        </div>
      </section>

      {/* ── メインコンテンツ ─────────────────────────────── */}
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 md:gap-12 md:pb-20">
        {/* STOCK TOP（おすすめ在庫カード） */}
        <section className="mt-4">
          <div className="rounded-[32px] border border-red-900/60 bg-gradient-to-b from-black/80 via-black/90 to-black/90 p-[2px] shadow-[0_0_50px_rgba(248,113,113,0.4)]">
            <div className="rounded-[30px] bg-gradient-to-b from-[#141416] via-[#050507] to-[#141416] p-4 md:p-5">
              <div className="relative overflow-hidden rounded-[26px] border border-red-500/40 bg-black/70">
                {/* 画像 */}
                <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
                  {featured && (featured as any).image ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center brightness-[0.55]"
                        style={{
                          backgroundImage: `url(${(featured as any).image})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/85" />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                      おすすめ在庫車の写真を /public/images に追加してください
                    </div>
                  )}

                  {/* テキストオーバーレイ */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-6">
                    {/* 左上 STOCK TOP */}
                    <div className="inline-flex rounded-full border border-white/60 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-neutral-50 backdrop-blur-sm md:px-4 md:text-[11px]">
                      STOCK TOP
                    </div>

                    {/* 下部 情報帯＋ボタン */}
                    {featured && (
                      <div className="mt-auto flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        {/* 情報帯 */}
                        <div className="inline-flex max-w-[70%] flex-col gap-2 rounded-2xl border border-white/55 bg-white/12 px-4 py-3 text-left text-black/90 backdrop-blur-sm md:max-w-[65%] md:px-5 md:py-3.5">
                          <div className="text-[11px] font-semibold tracking-[0.18em] text-neutral-900/70">
                            BUGATTI
                          </div>
                          <div className="text-sm font-semibold md:text-base">
                            {featuredName ?? "在庫車を準備中"}
                          </div>
                          <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5 text-[11px] text-neutral-900/80 md:text-[12px]">
                            {featured.year && (
                              <>
                                <span className="text-neutral-700">年式</span>
                                <span>{featured.year}年式</span>
                              </>
                            )}
                            {featured.odometerKm && (
                              <>
                                <span className="text-neutral-700">走行距離</span>
                                <span>
                                  {Number(featured.odometerKm).toLocaleString(
                                    "ja-JP"
                                  )}
                                  km
                                </span>
                              </>
                            )}
                            {featuredPriceLabel && (
                              <>
                                <span className="text-neutral-700">価格</span>
                                <span>{featuredPriceLabel}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* 在庫車一覧ボタン */}
                        <div className="flex justify-end md:justify-center">
                          <Link
                            href="/inventory"
                            className="inline-flex min-w-[150px] items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold tracking-[0.16em] text-white shadow-[0_0_28px_rgba(239,68,68,0.9)] transition hover:bg-red-500 hover:shadow-[0_0_36px_rgba(239,68,68,1)] md:min-w-[170px]"
                          >
                            在庫車一覧
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COLUMN / 整備記録簿 */}
        <section
          id="layout"
          className="grid gap-6 md:grid-cols-2 md:gap-8"
          aria-label="コラムと整備記録簿"
        >
          <article className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
              COLUMN
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-wide">
              中古車コラム
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-200/85">
              買取査定の裏側や仕入れの基準、展示の工夫など
              中古車屋ならではの視点でまとめる短いコラムのスペース。
            </p>
          </article>

          <article className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
              整備記録簿
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-wide">
              整備記録と入庫履歴
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-200/85">
              納車前点検やオイル交換、消耗品交換などの整備履歴を整理するスペース。
              在庫車ごとのメンテナンス状況を把握しやすくするための下準備。
            </p>
          </article>
        </section>

        {/* このサイトでできること */}
        <section
          id="features"
          className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6"
        >
          <h2 className="text-base font-semibold tracking-wide">
            このサイトでできること
          </h2>

          <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-neutral-200/85">
            <li className="flex gap-2">
              <span className="mt-[5px] h-[6px] w-[6px] rounded-full bg-red-500" />
              <span>在庫車リストと車両ごとの基本情報の確認</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[5px] h-[6px] w-[6px] rounded-full bg-red-500" />
              <span>輸入車と国産車を同じ条件で比較</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[5px] h-[6px] w-[6px] rounded-full bg-red-500" />
              <span>中古車屋さんならではの目線でのコラム</span>
            </li>
          </ul>

          <p className="mt-5 text-[11px] text-neutral-500">
            個別ページや比較機能を順次追加予定。
          </p>
        </section>
      </div>
    </main>
  );
}
