// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllInventory } from "@/lib/inventory";

export const metadata: Metadata = {
  title: "AUTO COLLECTION Bondage | 在庫車トップ",
  description:
    "AUTO COLLECTION Bondage の在庫車一覧とショップ概要をまとめたトップページ",
};

export default function HomePage() {
  const cars = getAllInventory();
  const featured =
    cars.find(
      (car) => car.status === "IN_STOCK" || car.status === "stock"
    ) ?? cars[0];

  const featuredName =
    featured &&
    (featured.displayName ??
      [featured.maker, featured.model, featured.grade]
        .filter(Boolean)
        .join(" "));

  const featuredImage =
    featured && (featured as any).image
      ? (featured as any).image
      : "/images/inventory/bugatti-chiron-main.jpg";

  return (
    <main className="relative min-h-screen bg-black text-neutral-50">
      {/* 四隅ナビゲーション */}
      <div className="pointer-events-none fixed inset-0 z-30">
        {/* 左上 ブランドロゴ */}
        <div className="pointer-events-auto absolute left-4 top-4 md:left-8 md:top-8">
          <Link
            href="/"
            className="border-l-2 border-red-600/80 pl-2 text-[10px] font-semibold tracking-[0.24em] text-neutral-100 md:text-xs"
          >
            <div className="leading-tight">AUTO COLLECTION</div>
            <div className="text-sm tracking-[0.18em] md:text-base">
              BONDAGE
            </div>
          </Link>
        </div>

        {/* 右上 MENU ダミー */}
        <div className="pointer-events-auto absolute right-4 top-4 text-[10px] font-medium tracking-[0.22em] text-neutral-200 md:right-8 md:top-8 md:text-xs">
          <span>MENU</span>{" "}
          <span className="align-middle text-red-500/80">///</span>
        </div>

        {/* 右下 PIT IN ボタン（在庫車ページへ） */}
        <div className="pointer-events-auto absolute bottom-4 right-4 md:bottom-8 md:right-8">
          <Link
            href="/inventory"
            className="inline-flex items-center justify-center bg-red-600 px-5 py-2 text-xs font-semibold tracking-[0.16em] text-white shadow-[0_0_18px_rgba(239,68,68,0.7)] transition hover:bg-red-500 hover:shadow-[0_0_24px_rgba(239,68,68,0.9)] md:px-7 md:py-2.5 md:text-sm"
          >
            PIT IN
          </Link>
        </div>
      </div>

      {/* ① ヒーローセクション（hero.jpgは空枠だけ用意しておく） */}
      <section className="relative h-[80vh] md:h-screen overflow-hidden">
        {/* 背景画像: /public/images/hero.jpg にユーザー側で配置 */}
        <Image
          src="/images/hero.jpg"
          alt="AUTO COLLECTION Bondage hero"
          fill
          priority
          className="object-cover"
        />
        {/* 暗めのオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/95" />

        {/* 中央テキスト */}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="text-center space-y-6">
            <p className="text-xs tracking-[0.35em] uppercase text-neutral-300">
              AUTO COLLECTION
            </p>
            {/* ③ Bondageを大きく、筆記体風（フォントは後で差し替え前提） */}
            <h1 className="text-4xl md:text-6xl font-semibold tracking-[0.12em]">
              <span className="inline-block align-middle">Bondage</span>
            </h1>
            <p className="text-sm md:text-base text-neutral-200 max-w-xl mx-auto">
              夜のガレージと昼の生活のあいだにある場所。まずはこの1枚から、在庫車と世界観を覗いてください。
            </p>

            {/* ヒーロー中央の在庫車一覧ボタン */}
            <div className="pt-4 flex justify-center">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center rounded-full border border-red-500 px-10 py-3 text-sm md:text-base font-medium tracking-[0.18em] uppercase bg-black/60 backdrop-blur-sm shadow-[0_0_32px_rgba(239,68,68,0.4)] transition-transform hover:scale-[1.02]"
              >
                在庫車一覧
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:gap-12 md:py-20">
        {/* ④ 2枚目: おすすめ在庫車の全面画像カード＋テキストオーバーレイ */}
        <section className="rounded-[32px] border border-red-500/60 bg-black shadow-[0_0_40px_rgba(239,68,68,0.65)] overflow-hidden">
          <div className="relative h-[320px] md:h-[420px] w-full">
            <Image
              src={featuredImage}
              alt={featuredName ?? "在庫車メインイメージ"}
              fill
              priority
              className="object-cover"
            />
            {/* 画像下側を暗くして文字を読みやすく */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            {/* テキスト＋ボタンを画像の上に重ねる */}
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="px-6 pb-7 md:px-8 md:pb-8 space-y-2 md:space-y-3">
                <p className="text-[10px] font-semibold tracking-[0.24em] text-neutral-300">
                  PICKUP STOCK
                </p>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-xl md:text-2xl font-semibold">
                    {featuredName ?? "在庫車を準備中"}
                  </h2>
                  {featured && (
                    <p className="text-xs md:text-sm text-neutral-300">
                      {featured.year && `${featured.year}年式`}
                      {featured.mileageKm &&
                        `・${Intl.NumberFormat("ja-JP").format(
                          Number(featured.mileageKm)
                        )}km`}
                    </p>
                  )}
                </div>

                {featured && featured.priceYen && (
                  <p className="text-sm md:text-base text-neutral-100">
                    価格:￥
                    {Intl.NumberFormat("ja-JP").format(
                      Number(featured.priceYen)
                    )}
                  </p>
                )}

                {/* 画像下部中央の大きい在庫一覧ボタン（赤枠＋発光） */}
                <div className="pt-4 flex justify-center">
                  <Link
                    href="/inventory"
                    className="inline-flex items-center justify-center rounded-full border border-red-500 px-10 py-3 text-sm md:text-base font-medium tracking-[0.18em] uppercase text-white bg-black/70 backdrop-blur-sm shadow-[0_0_40px_rgba(239,68,68,0.7)] hover:bg-red-600 hover:shadow-[0_0_60px_rgba(239,68,68,0.9)] transition"
                  >
                    在庫車一覧
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 在庫車トップ（テキストベースの概要カード） */}
        <section className="rounded-3xl border border-red-900/50 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-6 shadow-[0_0_40px_rgba(0,0,0,0.7)] md:p-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <header className="space-y-2">
              <div className="text-[10px] font-medium tracking-[0.24em] text-red-300/90 md:text-xs">
                STOCK TOP
              </div>
              <h2 className="text-2xl font-semibold tracking-wide md:text-3xl">
                在庫車トップ
              </h2>
              <p className="text-[13px] leading-relaxed text-neutral-200/85">
                現在取り扱い中の在庫車とおすすめ車種の入り口ページ。
                まずはブガッティをはじめとする在庫車から、ガレージの世界観を眺めてください。
              </p>
            </header>

            {/* 下部タブ風リンク */}
            <div className="mt-2 flex flex-col gap-2 md:flex-row">
              <Link
                href="/inventory"
                className="flex flex-1 items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_25px_rgba(248,113,113,0.55)] transition hover:bg-red-500 hover:shadow-[0_0_35px_rgba(248,113,113,0.75)]"
              >
                在庫車リスト
              </Link>
              <Link
                href="/inventory#all"
                className="flex flex-1 items-center justify-center rounded-full border border-red-500/60 bg-black/40 px-6 py-2.5 text-sm font-semibold tracking-wide text-red-100/90 shadow-inner shadow-red-950/60 transition hover:border-red-400 hover:bg-red-950/30"
              >
                在庫車一覧
              </Link>
              <Link
                href="/inventory#type"
                className="flex flex-1 items-center justify-center rounded-full border border-neutral-700 bg-black/40 px-6 py-2.5 text-sm font-semibold tracking-wide text-neutral-100 shadow-inner shadow-black/60 transition hover:border-neutral-500 hover:bg-neutral-900/80"
              >
                輸入車と国産車
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
            <h3 className="mt-2 text-lg font-semibold tracking-wide">
              中古車コラム
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-200/85">
              買取査定の裏側や仕入れの基準、展示の工夫など中古車屋ならではの視点でまとめる短いコラムのスペース。
              将来的には在庫車ごとのエピソードもここからリンクさせます。
            </p>
          </article>

          {/* 整備記録簿 */}
          <article className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
              整備記録簿
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-wide">
              整備記録と入庫履歴
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-200/85">
              納車前点検やオイル交換、消耗品交換などの整備履歴を整理するスペース。
              在庫車ごとのメンテナンス状況を把握しやすくするための下準備です。
            </p>
          </article>
        </section>

        {/* このサイトでできること */}
        <section
          id="features"
          className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6"
        >
          <h3 className="text-base font-semibold tracking-wide">
            このサイトでできること
          </h3>

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
