// src/app/inventory/[id]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllInventory,
  getInventoryById,
  formatMileageKm,
  formatPriceYen,
  type InventoryItem,
} from "@/lib/inventory";
import { DetailGallery } from "@/components/inventory/DetailGallery";

type RouteParams = {
  id: string;
};

// 静的生成用
export const dynamic = "error";

export async function generateStaticParams() {
  const cars = getAllInventory();
  return cars.map((car) => ({ id: car.id }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const car = getInventoryById(params.id);

  if (!car) {
    return {
      title: "在庫車両が見つかりません | Auto Collection Bondage",
      description: "指定された在庫車両は存在しません。",
    };
  }

  const baseTitle = car.title ?? "在庫車両";
  const desc =
    car.description ??
    car.shortDescription ??
    car.catchCopy ??
    "Auto Collection Bondageの在庫車詳細ページ。";

  return {
    title: `${baseTitle} | Auto Collection Bondage`,
    description: desc,
  };
}

export default function InventoryDetailPage({
  params,
}: {
  params: RouteParams;
}) {
  const car = getInventoryById(params.id);

  if (!car) {
    notFound();
  }

  const {
    title,
    maker,
    model,
    year,
    mileageKm,
    priceYen,
    color,
    grade,
    engine,
    transmission,
    drive,
    bodyType,
    lifestyleNote,
    specNote,
    description,
    shortDescription,
    tags,
    image,
    imageMain,
    imageInterior,
    imageRear,
    imageEngine,
  } = car as InventoryItem;

  const displayTitle = title ?? "在庫車両";
  const displayPrice = formatPriceYen(priceYen);
  const displayMileage = formatMileageKm(mileageKm);

  const heroImageMain =
    imageMain ?? image ?? "/images/inventory/placeholder-main.jpg";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 text-neutral-100">
      {/* パンくず＋戻るリンク */}
      <div className="mb-4 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex flex-wrap items-center gap-1">
          <Link
            href="/"
            className="rounded-full px-2 py-1 hover:bg-neutral-900 hover:text-neutral-100"
          >
            Home
          </Link>
          <span className="text-neutral-600">/</span>
          <Link
            href="/inventory"
            className="rounded-full px-2 py-1 hover:bg-neutral-900 hover:text-neutral-100"
          >
            Inventory
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">{displayTitle}</span>
        </div>

        <Link
          href="/inventory"
          className="rounded-full border border-neutral-700 px-3 py-1 text-[11px] hover:border-neutral-500 hover:bg-neutral-900"
        >
          ← 一覧に戻る
        </Link>
      </div>

      {/* ヘッダー部 */}
      <section className="mb-6 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-500">
          Auto Collection Bondage Inventory
        </p>
        <h1 className="text-2xl font-semibold leading-snug sm:text-3xl">
          {displayTitle}
        </h1>
        <div className="flex flex-wrap gap-2 text-xs text-neutral-400">
          {maker && (
            <span className="rounded-full border border-neutral-700 px-3 py-1">
              {maker}
            </span>
          )}
          {model && (
            <span className="rounded-full border border-neutral-700 px-3 py-1">
              {model}
            </span>
          )}
          {year && (
            <span className="rounded-full border border-neutral-700 px-3 py-1">
              {year}年式
            </span>
          )}
          {bodyType && (
            <span className="rounded-full border border-neutral-700 px-3 py-1">
              {bodyType}
            </span>
          )}
          {grade && (
            <span className="rounded-full border border-neutral-700 px-3 py-1">
              グレード:{grade}
            </span>
          )}
        </div>
      </section>

      {/* メイン2カラム */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* 画像ギャラリー */}
        <div className="space-y-4">
          <DetailGallery
            main={heroImageMain}
            interior={imageInterior}
            rear={imageRear}
            engine={imageEngine}
            alt={displayTitle}
          />
        </div>

        {/* スペックカード */}
        <aside className="space-y-4">
          <div className="rounded-3xl border border-neutral-800 bg-black/70 p-5 shadow-[0_0_40px_rgba(0,0,0,0.7)]">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Condition Sheet
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs text-neutral-400">車両本体価格</span>
                <span className="text-lg font-semibold text-[#ecdab9]">
                  {displayPrice}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-[13px]">
                <div>
                  <p className="text-neutral-500">年式</p>
                  <p className="text-neutral-100">
                    {year ? `${year}年` : "確認中"}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500">走行距離</p>
                  <p className="text-neutral-100">{displayMileage}</p>
                </div>
                <div>
                  <p className="text-neutral-500">カラー</p>
                  <p className="text-neutral-100">
                    {color ?? "確認中"}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500">エンジン</p>
                  <p className="text-neutral-100">
                    {engine ?? "確認中"}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500">ミッション</p>
                  <p className="text-neutral-100">
                    {transmission ?? "確認中"}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500">駆動方式</p>
                  <p className="text-neutral-100">
                    {drive ?? "確認中"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ライフスタイル/メモ */}
          {(shortDescription || description || lifestyleNote || specNote) && (
            <div className="space-y-3 rounded-3xl border border-neutral-800 bg-black/60 p-5 text-sm">
              {shortDescription && (
                <p className="text-neutral-200">{shortDescription}</p>
              )}
              {description && (
                <p className="text-neutral-300 text-[13px] leading-relaxed">
                  {description}
                </p>
              )}
              {lifestyleNote && (
                <div className="text-[12px] text-neutral-300">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Lifestyle Note
                  </p>
                  <p className="leading-relaxed">{lifestyleNote}</p>
                </div>
              )}
              {specNote && (
                <div className="text-[12px] text-neutral-300">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Spec Note
                  </p>
                  <p className="leading-relaxed">{specNote}</p>
                </div>
              )}
            </div>
          )}

          {/* タグ */}
          {tags && tags.length > 0 && (
            <div className="rounded-3xl border border-neutral-800 bg-black/60 p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Tags
              </p>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-700 px-3 py-1 text-neutral-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>

      {/* 下部の問い合わせ導線(ダミー) */}
      <section className="mt-10 rounded-3xl border border-neutral-800 bg-gradient-to-r from-black via-black to-red-950/30 px-5 py-6 text-xs text-neutral-300 sm:px-7 sm:py-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Contact
            </p>
            <p className="text-sm text-neutral-100">
              この車両についての問い合わせや、似たキャラクターの1台を探す相談も受け付けています。
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-full border border-red-700/80 bg-red-700/20 px-4 py-2 text-[11px] font-semibold text-[#ecdab9] shadow-[0_0_30px_rgba(220,38,38,0.55)] transition hover:bg-red-600/40"
            >
              LINEで相談する(ダミー)
            </button>
            <button
              type="button"
              className="rounded-full border border-neutral-700 bg-black/70 px-4 py-2 text-[11px] font-semibold text-neutral-200 hover:border-neutral-500 hover:bg-neutral-900"
            >
              メールフォーム(準備中)
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
