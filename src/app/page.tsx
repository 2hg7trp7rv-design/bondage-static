// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AUTO COLLECTION Bondage | 在庫車トップ",
  description:
    "AUTO COLLECTION Bondage の在庫車一覧とショップ概要をまとめたトップページ",
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0F0F10] text-neutral-50">
      {/* 四隅ナビゲーション */}
      <div className="pointer-events-none fixed inset-0 z-30">
        {/* 左上 ブランド */}
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
          <span className="text-red-500/80 align-middle">///</span>
        </div>

        {/* 左下 ロケーション表示 */}
        <div className="pointer-events-auto absolute bottom-4 left-4 text-[10px] tracking-wide text-neutral-400 md:bottom-8 md:left-8 md:text-xs">
          <div>YONAGO TOTTORI</div>
          <div className="mt-0.5 text-[9px] text-neutral-500 md:text-[10px]">
            35.4°N / 133.3°E
          </div>
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
        {/* HERO */}
        <section className="rounded-3xl border border-red-900/50 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-6 shadow-[0_0_40px_rgba(0,0,0,0.7)] md:p-8">
          <div className="space-y-5">
            <div className="text-[10px] font-medium tracking-[0.24em] text-red-300/90 md:text-xs">
              AUTO COLLECTION BONDAGE
            </div>

            <h1 className="text-2xl font-semibold tracking-wide md:text-3xl">
              在庫車トップ
            </h1>

            <p className="text-[13px] leading-relaxed text-neutral-200/85">
              現在取り扱い中の在庫車とショップの基本情報をまとめたトップページ
            </p>

            <div className="flex flex-col gap-3 pt-2 md:flex-row">
              {/* 在庫車ページへのリンク */}
              <Link
                href="/inventory"
                className="flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_25px_rgba(248,113,113,0.55)] transition hover:bg-red-500 hover:shadow-[0_0_35px_rgba(248,113,113,0.75)]"
              >
                在庫車リスト
              </Link>

              {/* ページ内アンカー */}
              <Link
                href="#layout"
                className="flex items-center justify-center rounded-full border border-red-500/60 bg-black/40 px-6 py-2.5 text-sm font-semibold tracking-wide text-red-100/90 shadow-inner shadow-red-950/60 transition hover:border-red-400 hover:bg-red-950/30"
              >
                ショップレイアウト
              </Link>

              <Link
                href="#features"
                className="flex items-center justify-center rounded-full border border-neutral-700 bg-black/40 px-6 py-2.5 text-sm font-semibold tracking-wide text-neutral-100 shadow-inner shadow-black/60 transition hover:border-neutral-500 hover:bg-neutral-900/80"
              >
                機能一覧
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 text-[11px] text-neutral-200/80">
              <span className="rounded-full border border-red-500/50 bg-black/40 px-3 py-1">
                在庫車一覧
              </span>
              <span className="rounded-full border border-red-500/30 bg-black/40 px-3 py-1">
                輸入車と国産車
              </span>
              <span className="rounded-full border border-red-500/30 bg-black/40 px-3 py-1">
                ガレージ運用
              </span>
            </div>
          </div>
        </section>

        {/* NIGHT / DAY セクション */}
        <section
          id="layout"
          className="grid gap-6 md:grid-cols-2 md:gap-8"
          aria-label="ショップレイアウト"
        >
          {/* NIGHT SIDE */}
          <article className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
              NIGHT SIDE
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-wide">
              夜間営業時の展示構成
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-200/85">
              夜間営業時の照明と車両配置を前提にした展示構成
              通りからの見え方とガレージ内の動線を優先したレイアウト
            </p>
          </article>

          {/* DAY SIDE */}
          <article className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6">
            <div className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
              DAY SIDE
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-wide">
              日中作業時のガレージ運用
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-200/85">
              日中の整備作業と接客を前提にしたガレージの使い方
              入庫車両の出し入れと作業スペースの確保を中心にした配置
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
              <span>輸入車と国産車を同じ条件での比較</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[4px] h-[6px] w-[6px] rounded-full bg-red-500" />
              <span>在庫データと連動した個別ページへの遷移</span>
            </li>
          </ul>

          <p className="mt-5 text-[11px] text-neutral-500">
            inventory.json と連動した個別ページや比較機能を順次追加予定
          </p>
        </section>
      </div>
    </main>
  );
}
