// src/app/inventory/[id]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllInventory,
  formatPriceYen,
  formatMileageKm,
} from "@/lib/inventory";

// 動的メタデータ
export async function generateMetadata(
  { params }: any
): Promise<Metadata> {
  const cars = getAllInventory();
  const resolvedParams = await params;
  const car = cars.find((item) => item.id === resolvedParams?.id);

  if (!car) {
    return {
      title: "在庫情報が見つかりません | AUTO COLLECTION BANDAGE",
      description: "指定された在庫IDの車両情報は見つかりませんでした",
    };
  }

  const title = `${car.maker} ${car.title} | 在庫車詳細`;
  const description =
    car.shortDescription ??
    car.catchCopy ??
    "AUTO COLLECTION BANDAGE の在庫車詳細ページ 価格や走行距離 装備情報を掲載";

  return {
    title,
    description,
  };
}

// ページ本体
export default async function InventoryDetailPage(
  { params }: any
) {
  const cars = getAllInventory();
  const resolvedParams = await params;
  const currentCarId = resolvedParams?.id;

  const car = cars.find((item) => item.id === currentCarId);

  if (!car) {
    return notFound();
  }

  // 画像パス（在庫ごとに固定）
  const mainImage = car.images?.main ?? "/images/inventory/bugatti-chiron-main.jpg";
  const interiorImage =
    car.images?.interior ?? "/images/inventory/bugatti-chiron-interior.jpg";
  const rearImage =
    car.images?.rear ?? "/images/inventory/bugatti-chiron-rear.jpg";
  const engineImage =
    car.images?.engine ?? "/images/inventory/bugatti-chiron-engine.jpg";

  // 他の在庫（同ページ内の回遊用）
  const otherCars = cars.filter((item) => item.id !== car.id);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-20 pt-8">
      {/* パンくず */}
      <nav className="mb-1 text-[11px] text-neutral-500">
        <Link
          href="/inventory"
          className="underline-offset-2 hover:underline"
        >
          在庫車一覧
        </Link>
        <span className="mx-1.5 text-neutral-600">/</span>
        <span>{car.title}</span>
      </nav>

      {/* ヘッダー + メイン画像 */}
      <section className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start">
        {/* テキスト側 */}
        <div className="space-y-3 md:space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Inventory Detail
          </p>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
              {car.maker}
            </p>
            <h1 className="mt-1 text-xl font-semibold sm:text-2xl">
              {car.title}
            </h1>
          </div>

          {car.catchCopy && (
            <p className="text-xs font-medium text-[#ecdab9]">
              {car.catchCopy}
            </p>
          )}

          {car.shortDescription && (
            <p className="text-sm leading-relaxed text-neutral-300">
              {car.shortDescription}
            </p>
          )}

          {/* 価格とステータス */}
          <div className="mt-2 flex flex-wrap items-end gap-4 border-t border-neutral-900 pt-3">
            <div>
              <p className="text-[11px] text-neutral-500">車両本体価格</p>
              <p className="text-2xl font-semibold text-red-500">
                {formatPriceYen(car.priceYen)}
              </p>
            </div>
            <div className="rounded-full border border-neutral-800 bg-black/70 px-3 py-1 text-[11px] text-neutral-300">
              {car.status === "stock" && "在庫あり"}
              {car.status === "sold" && "成約済"}
              {car.status === "coming_soon" && "入庫予定"}
            </div>
          </div>
        </div>

        {/* メイン画像 */}
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-black via-neutral-950 to-[#1a0b0b] shadow-[0_0_40px_rgba(0,0,0,0.7)]">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={mainImage}
              alt={`${car.title} メイン画像`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 420px, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* 詳細情報 + ギャラリー */}
      <section className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] md:items-start">
        {/* スペックなど */}
        <InventoryMetaSection car={car} />

        {/* 詳細ギャラリー */}
        <DetailGallery
          main={mainImage}
          interior={interiorImage}
          rear={rearImage}
          engine={engineImage}
          title={car.title}
        />
      </section>

      {/* ライフスタイルコメント */}
      {car.lifestyleNote && (
        <section className="mt-4 rounded-2xl border border-neutral-800 bg-black/70 px-4 py-4 text-[13px] leading-relaxed text-neutral-300 sm:px-5 sm:py-5">
          <h2 className="mb-2 text-sm font-semibold">
            このクルマと暮らすイメージ
          </h2>
          <p>{car.lifestyleNote}</p>
        </section>
      )}

      {/* 他の在庫へのリンク */}
      {otherCars.length > 0 && (
        <section className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold text-neutral-100">
            他の在庫車
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-1 text-[12px]">
            {otherCars.map((item) => (
              <Link
                key={item.id}
                href={`/inventory/${item.id}`}
                className="min-w-[160px] rounded-xl border border-neutral-800 bg-black/70 px-3 py-2 hover:border-red-500/70"
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                  {item.maker}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[12px] text-neutral-100">
                  {item.title}
                </p>
                <p className="mt-1 text-[11px] text-red-400">
                  {formatPriceYen(item.priceYen)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

// 在庫メタ情報
type InventoryCar = ReturnType<typeof getAllInventory>[number];

type InventoryMetaSectionProps = {
  car: InventoryCar;
};

function InventoryMetaSection({ car }: InventoryMetaSectionProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-neutral-800 bg-black/70 p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-neutral-100">
        基本情報
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12px] text-neutral-200 sm:text-[13px]">
        {car.year && (
          <div>
            <p className="text-[11px] text-neutral-500">年式</p>
            <p>{car.year}年</p>
          </div>
        )}
        {car.mileageKm && (
          <div>
            <p className="text-[11px] text-neutral-500">走行距離</p>
            <p>{formatMileageKm(car.mileageKm)}</p>
          </div>
        )}
        {car.color && (
          <div>
            <p className="text-[11px] text-neutral-500">ボディカラー</p>
            <p>{car.color}</p>
          </div>
        )}
        {car.transmission && (
          <div>
            <p className="text-[11px] text-neutral-500">ミッション</p>
            <p>{car.transmission}</p>
          </div>
        )}
        {car.drive && (
          <div>
            <p className="text-[11px] text-neutral-500">駆動方式</p>
            <p>{car.drive}</p>
          </div>
        )}
        {car.displacementCc && (
          <div>
            <p className="text-[11px] text-neutral-500">排気量</p>
            <p>{car.displacementCc.toLocaleString()} cc</p>
          </div>
        )}
        {car.powerPs && (
          <div>
            <p className="text-[11px] text-neutral-500">最高出力</p>
            <p>{car.powerPs} ps</p>
          </div>
        )}
        {car.torqueNm && (
          <div>
            <p className="text-[11px] text-neutral-500">最大トルク</p>
            <p>{car.torqueNm} Nm</p>
          </div>
        )}
      </div>

      {/* 装備などがあればここに追加 */}
      {car.tags && car.tags.length > 0 && (
        <InventoryTags tags={car.tags} />
      )}
    </section>
  );
}

type InventoryTagsProps = {
  tags: string[];
};

function InventoryTags({ tags }: InventoryTagsProps) {
  return (
    <div className="pt-2">
      <p className="mb-1 text-[11px] text-neutral-500">
        キーワード
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-neutral-800 bg-black/60 px-2.5 py-0.5 text-[10px] text-neutral-300"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// 詳細ギャラリー（メイン 内装 テール エンジンルーム）
type DetailGalleryProps = {
  main: string;
  interior: string;
  rear: string;
  engine: string;
  title: string;
};

"use client";

import { useState } from "react";

function DetailGallery({
  main,
  interior,
  rear,
  engine,
  title,
}: DetailGalleryProps) {
  const [activeKey, setActiveKey] = useState<"main" | "interior" | "rear" | "engine">("main");

  const images: { key: "main" | "interior" | "rear" | "engine"; label: string; src: string }[] = [
    { key: "main", label: "MAIN", src: main },
    { key: "interior", label: "INTERIOR", src: interior },
    { key: "rear", label: "REAR", src: rear },
    { key: "engine", label: "ENGINE", src: engine },
  ];

  const active = images.find((img) => img.key === activeKey) ?? images[0];

  return (
    <section className="space-y-3 rounded-2xl border border-neutral-800 bg-black/70 p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-neutral-100">
        ディテールギャラリー
      </h2>

      {/* 画像表示エリア */}
      <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/80">
        <div className="relative aspect-[4/3] w-full">
          <Image
            key={active.key}
            src={active.src}
            alt={`${title} ${active.label} 画像`}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 420px, 100vw"
          />
        </div>
      </div>

      {/* タブ（横スライド） */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-[11px]">
        {images.map((img) => {
          const isActive = img.key === activeKey;
          return (
            <button
              key={img.key}
              type="button"
              onClick={() => setActiveKey(img.key)}
              className={[
                "min-w-[96px] rounded-full border px-3 py-1.5 transition",
                isActive
                  ? "border-red-500/80 bg-red-600/20 text-red-200"
                  : "border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-600",
              ].join(" ")}
            >
              {img.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
