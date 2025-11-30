// src/app/inventory/[id]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllInventory,
  getInventoryById,
  formatMileageKm,
  formatPriceYen,
} from "@/lib/inventory";
import { DetailGallery } from "@/components/inventory/DetailGallery";

// SSG用: 事前ビルドするパス
export async function generateStaticParams() {
  const cars = getAllInventory();
  return cars.map((car) => ({ id: car.id }));
}

// SEO用メタデータ
export async function generateMetadata(
  { params }: { params: any },
): Promise<Metadata> {
  const car = getInventoryById(String(params.id));

  if (!car) {
    return {
      title: "在庫車が見つかりません | Auto Collection Bandage",
      description: "指定された在庫車は現在登録されていません。",
    };
  }

  const title = `${car.title} | Auto Collection Bandage`;
  const description =
    car.shortDescription ??
    `${car.maker} ${car.title}の在庫車詳細ページです。`;

  const imageUrl =
    car.mainImage ?? "/images/inventory/bugatti-chiron-main.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// 詳細ページ本体
export default function InventoryDetailPage({ params }: { params: any }) {
  const car = getInventoryById(String(params.id));

  if (!car) {
    notFound();
  }

  const {
    id,
    maker,
    title,
    year,
    mileageKm,
    transmission,
    drive,
    color,
    grade,
    priceYen,
    lifestyleNote,
    tags,
    mainImage,
    interiorImage,
    rearImage,
    engineImage,
  } = car!;

  const heroImageSrc =
    mainImage ?? "/images/inventory/bugatti-chiron-main.jpg";

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-20 pt-10">
      {/* 戻るリンク */}
      <div className="text-xs text-neutral-400">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-black/60 px-3 py-1.5 text-[11px] text-neutral-200 transition hover:border-neutral-600 hover:bg-neutral-900"
        >
          <span>←</span>
          <span>在庫車一覧に戻る</span>
        </Link>
      </div>

      {/* 上部: 画像＋基本情報 */}
      <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
        {/* メイン画像＋サマリー */}
        <article className="space-y-4">
          {/* メインイメージ（在庫一覧と同じmainが入る場所） */}
          <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 shadow-[0_0_40px_rgba(0,0,0,0.7)]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={heroImageSrc}
                alt={title}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* タイトルと価格 */}
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
              {maker}
            </p>
            <h1 className="text-xl font-semibold sm:text-2xl">
              {title}
            </h1>

            <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <div className="text-xs text-neutral-400">
                {year && (
                  <div>
                    年式<span className="mx-1">:</span>
                    <span className="text-neutral-100">{year}年</span>
                  </div>
                )}
                {grade && (
                  <div>
                    グレード<span className="mx-1">:</span>
                    <span className="text-neutral-100">{grade}</span>
                  </div>
                )}
                {color && (
                  <div>
                    ボディカラー<span className="mx-1">:</span>
                    <span className="text-neutral-100">{color}</span>
                  </div>
                )}
              </div>

              <div className="text-right">
                <p className="text-[11px] text-neutral-500">
                  車両本体価格
                </p>
                <p className="text-xl font-semibold text-red-500">
                  {formatPriceYen(priceYen)}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* 右側: スペック＆状態 */}
        <article className="space-y-4 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
          <h2 className="text-sm font-semibold tracking-wide">
            基本スペック
          </h2>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-neutral-200 sm:text-xs">
            {mileageKm != null && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-500">走行距離</span>
                <span className="font-medium">
                  {formatMileageKm(mileageKm)}
                </span>
              </div>
            )}
            {transmission && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-500">ミッション</span>
                <span className="font-medium">{transmission}</span>
              </div>
            )}
            {drive && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-500">駆動方式</span>
                <span className="font-medium">{drive}</span>
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <span className="text-neutral-500">管理番号</span>
              <span className="font-medium uppercase">{id}</span>
            </div>
          </div>

          {lifestyleNote && (
            <div className="mt-3 border-t border-neutral-800 pt-3 text-[11px] leading-relaxed text-neutral-300">
              {lifestyleNote}
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-800 bg-black/60 px-2.5 py-0.5 text-[10px] text-neutral-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </section>

      {/* 詳細ギャラリー（main・内装・テール・エンジンルーム） */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-wide">
          ディテールギャラリー
        </h2>
        <DetailGallery
          main={heroImageSrc}
          interior={interiorImage}
          rear={rearImage}
          engine={engineImage}
          alt={title}
        />
      </section>
    </main>
  );
}
