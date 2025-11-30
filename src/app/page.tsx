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

  // 在庫から優先的に 1 台ピックアップ
  const featured =
    cars.find((car) => {
      const status = String((car as any).status);
      return status === "IN_STOCK" || status === "stock";
    }) ?? cars[0];

  // 表示名：メーカー＋車種＋グレードで組み立て
  const featuredName = featured
    ? [featured.maker, featured.model, featured.grade]
        .filter((v): v is string => Boolean(v))
        .join(" ")
    : "在庫車トップ";

  // 2枚目で使う画像（なければ hero.jpg）
  const featuredImage =
    (featured as any)?.mainImage ??
    (featured as any)?.image ??
    "/images/hero.jpg";

  // 説明文：在庫データに shortDescription があれば優先
  const featuredDescription: string | undefined =
    (featured as any)?.shortDescription ??
    (featured
      ? [featured.maker, featured.model]
          .filter((v): v is string => Boolean(v))
          .join(" ")
      : undefined);

  return (
    <main className="relative min-h-screen bg-[#050507] text-neutral-50">
      {/* 1枚目：ヒーローセクション（背景だけ hero.jpg。画像差し替えはあとで） */}
      <section className="relative h-[70vh] min-h-[460px] overflow-hidden">
        {/* 背景画像 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero.jpg)" }}
        />
        {/* トーン調整オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/60 to-black/90" />

        {/* ヘッダー（ナビ） */}
        <header className="relative z-20 flex items-center justify-between px-6 pt-5 md:px-10 md:pt-7">
          <div className="text-[11px] tracking-[0.26em] text-neutral-100 md:text-xs">
            AUTO COLLECTION{" "}
            <span className="ml-1 font-semibold text-red-500">Bondage</span>
          </div>
          <nav className="flex items-center gap-4 text-[11px] tracking-[0.2em] text-neutral-200 md:text-xs">
            <Link href="/" className="opacity-80">
              HOME
            </Link>
            <Link
              href="https://www.instagram.com"
              className="rounded-full border border-red-500/70 bg-black/60 px-4 py-1.5 text-[10px] font-semibold tracking-[0.22em] text-red-100 shadow-[0_0_18px_rgba(248,113,113,0.7)] md:text-[11px]"
            >
              INSTAGRAM
            </Link>
          </nav>
        </header>

        {/* テキストレイヤー */}
        <div className="relative z-10 flex h-full flex-col justify-center px-6 pb-16 pt-10 md:px-10 md:pb-24">
          <p className="text-xs font-light tracking-[0.3em] text-neutral-200/80 md:text-sm">
            AUTO COLLECTION
          </p>
          <h1 className="mt-4 text-4xl tracking-[0.18em] text-white md:text-5xl">
            <span className="font-serif italic">Bondage</span>
          </h1>
          <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-neutral-200/90 md:text-sm">
            夜のガレージと昼の生活のあいだにある場所。まずはこの1枚から、
            在庫車と世界観を覗いてください。
          </p>

          <div className="mt-9">
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center rounded-full border border-red-500/80 bg-black/60 px-10 py-3 text-sm font-semibold tracking-[0.18em] text-white shadow-[0_0_26px_rgba(248,113,113,0.65)] transition hover:bg-red-600 hover:shadow-[0_0_34px_rgba(248,113,113,0.9)]"
            >
              在庫車一覧
            </Link>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 md:gap-12 md:py-14">
        {/* 2枚目：在庫車トップ（画像全面＋文字を重ねる＋赤枠グロー） */}
        <section className="relative overflow-hidden rounded-[32px] border border-red-600/70 bg-black/70 shadow-[0_0_55px_rgba(248,113,113,0.55)]">
          {/* 背景画像（全面） */}
          <div
            className="h-[260px] w-full bg-cover bg-center md:h-[340px]"
            style={{ backgroundImage: `url(${featuredImage})` }}
          />

          {/* 下側グラデーション（文字を読みやすく） */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-transparent" />

          {/* オーバーレイテキスト */}
          <div className="absolute inset-x-5 bottom-5 space-y-3 md:inset-x-8 md:bottom-7 md:space-y-4">
            <p className="text-[10px] font-medium tracking-[0.26em] text-red-300/90 md:text-xs">
              STOCK TOP
            </p>

            <div className="space-y-1 md:flex md:flex-wrap md:items-end md:justify-between md:gap-2 md:space-y-0">
              <h2 className="text-lg font-semibold tracking-wide md:text-xl">
                {featuredName}
              </h2>

              {featured?.year && (
                <p className="text-[11px] text-neutral-200/85 md:text-xs">
                  {featured.year}年式
                </p>
              )}
            </div>

            {featuredDescription && (
              <p className="max-w-2xl text-[12px] leading-relaxed text-neutral-200/90 md:text-[13px]">
                {featuredDescription}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              {featured?.priceYen && (
                <div className="text-sm font-semibold text-white md:text-base">
                  価格：
                  {Intl.NumberFormat("ja-JP").format(
                    Number(featured.priceYen)
                  )}
                  円
                </div>
              )}

              <Link
                href="/inventory"
                className="inline-flex items-center justify-center rounded-full border border-red-400/90 bg-black/70 px-8 py-2.5 text-sm font-semibold tracking-[0.18em] text-white shadow-[0_0_26px_rgba(248,113,113,0.7)] transition hover:bg-red-600 hover:shadow-[0_0_34px_rgba(248,113,113,0.95)]"
              >
                在庫車一覧
              </Link>
            </div>
          </div>
        </section>

        {/* コラム / 整備記録簿 セクション */}
        <section
          id="layout"
          className="grid gap-6 md:grid-cols-2 md:gap-8"
          aria-label="コラムと整備記録簿"
        >
          {/* COLUMN */}
          <article className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
              COLUMN
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-wide">
              中古車コラム
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-200/85">
              買取査定の裏側や仕入れの基準、展示の工夫など
              中古車屋ならではの視点でまとめる短いコラムのスペース
            </p>
          </article>

          {/* 整備記録簿 */}
          <article className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
              整備記録簿
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-wide">
              整備記録と入庫履歴
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-200/85">
              納車前点検やオイル交換、消耗品交換などの整備履歴を整理するスペース
              在庫車ごとのメンテナンス状況を把握しやすくするための下準備
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
              <span className="mt-[4px] h-[6px] w-[6px] rounded-full bg-red-500" />
              <span>在庫車リストと車両ごとの基本情報の確認</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[4px] h-[6px] w-[6px] rounded-full bg-red-500" />
              <span>輸入車と国産車を同じ条件で比較</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[4px] h-[6px] w-[6px] rounded-full bg-red-500" />
              <span>中古車屋さんならではの目線でのコラム</span>
            </li>
          </ul>

          <p className="mt-5 text-[11px] text-neutral-500">
            個別ページや比較機能を順次追加予定
          </p>
        </section>
      </div>
    </main>
  );
}
