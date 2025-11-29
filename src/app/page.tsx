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

  // 在庫ステータスが "stock" の車から 1 台ピックアップ
  const featured =
    cars.find((car) => car.status === "stock") ?? (cars[0] ?? null);

  const featuredName = featured?.displayName ?? "おすすめ在庫";

  return (
    <main className="relative min-h-screen bg-[#0F0F10] text-neutral-50">
      {/* 四隅ナビゲーション（左上ブランドは削除） */}
      <div className="pointer-events-none fixed inset-0 z-30">
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

      {/* メインコンテンツ */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:gap-12 md:py-20">
        {/* BONDAGE ヒーロー */}
        <section className="flex min-h-[260px] flex-col justify-between rounded-3xl border border-red-900/60 bg-gradient-to-b from-black via-neutral-900 to-black p-6 shadow-[0_0_45px_rgba(0,0,0,0.85)] md:min-h-[340px] md:p-8">
          <div className="space-y-4">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-neutral-300/80 md:text-xs">
              AUTO COLLECTION
            </div>
            <h1 className="text-4xl font-semibold tracking-[0.4em] md:text-5xl">
              BONDAGE
            </h1>
            <p className="max-w-xl text-[13px] leading-relaxed text-neutral-200/85">
              在庫車とガレージ運用をまとめて管理するためのベースページ
            </p>
          </div>
        </section>

        {/* 在庫車トップ HERO（カード大 + 推し在庫表示） */}
        <section className="flex min-h-[380px] flex-col justify-between rounded-3xl border border-red-900/50 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-6 shadow-[0_0_40px_rgba(0,0,0,0.7)] md:min-h-[440px] md:p-8">
          {/* ラベル行 */}
          <div className="flex items-baseline justify-between gap-3">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-red-300/90 md:text-xs">
              在庫車TOP
            </div>
            <div className="text-[10px] tracking-[0.18em] text-neutral-400 md:text-xs">
              AUTO COLLECTION BONDAGE
            </div>
          </div>

          {/* タイトル + おすすめ在庫ブロック */}
          <div className="mt-4 flex flex-col gap-6 md:mt-6 md:flex-row md:items-center">
            {/* 左側 テキスト */}
            <div className="space-y-3 md:flex-1">
              <h2 className="text-2xl font-semibold tracking-wide md:text-3xl">
                在庫車トップ
              </h2>
              <p className="text-[13px] leading-relaxed text-neutral-200/85">
                現在取り扱い中の在庫車とショップの基本情報をまとめたベースページ
              </p>
            </div>

            {/* 右側 おすすめ在庫の「写真エリア」 */}
            <div className="md:flex-1">
              <div className="relative mt-4 flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-red-900/60 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 shadow-[0_0_40px_rgba(0,0,0,0.7)] md:mt-0">
                <div className="text-center text-xs text-neutral-300">
                  <div className="mb-2 text-[10px] font-semibold tracking-[0.24em] text-red-400/90">
                    RECOMMENDED STOCK
                  </div>
                  <div className="text-base font-semibold md:text-lg">
                    {featuredName}
                  </div>
                  {featured && (
                    <div className="mt-2 text-[11px] text-neutral-400">
                      {featured.maker} {featured.model} / {featured.year}年式
                    </div>
                  )}
                  {!featured && (
                    <div className="mt-2 text-[11px] text-neutral-500">
                      在庫登録後におすすめ在庫を表示
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 下部: 大ボタン + 小さな横並びタブ */}
          <div className="mt-6 space-y-3">
            {/* 在庫車リスト（メインCTA） */}
            <Link
              href="/inventory"
              className="flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_25px_rgba(248,113,113,0.55)] transition hover:bg-red-500 hover:shadow-[0_0_35px_rgba(248,113,113,0.75)]"
            >
              在庫車リスト
            </Link>

            {/* 小さなタブ（リンクなし） */}
            <div className="flex flex-wrap gap-2 text-[11px] text-neutral-200/85">
              <div className="rounded-full border border-red-500/50 bg-black/40 px-4 py-1.5">
                在庫車一覧
              </div>
              <div className="rounded-full border border-red-500/30 bg-black/40 px-4 py-1.5">
                輸入車と国産車
              </div>
            </div>
          </div>
        </section>

        {/* コラム / 整備記録簿 セクション */}
        <section
          aria-label="コンテンツ案内"
          className="grid gap-6 md:grid-cols-2 md:gap-8"
        >
          {/* コラム */}
          <article className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
              COLUMN
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-wide">コラム</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-200/85">
              中古車屋ならではの視点で書いたコラムをまとめるエリア
              在庫の背景や仕入れの理由などをテキストで整理する前提
            </p>
          </article>

          {/* 整備記録簿 */}
          <article className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
              SERVICE LOG
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-wide">
              整備記録簿
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-200/85">
              車両ごとの整備履歴や交換部品を一覧で管理するためのエリア
              在庫情報と合わせてメンテナンス履歴を確認できる構成
            </p>
          </article>
        </section>

        {/* このサイトでできること */}
        <section className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6">
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
