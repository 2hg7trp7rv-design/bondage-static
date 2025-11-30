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
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const cars = getAllInventory();
  const car = cars.find((item) => item.id === params.id);

  if (!car) {
    return {
      title: "在庫車が見つかりません | Auto Collection Bandage",
      description: "指定された在庫車は現在公開されていません。",
    };
  }

  const title = `${car.maker} ${car.title} | 在庫車詳細`;
  const desc =
    car.shortDescription ??
    `${car.maker} ${car.title}の在庫車詳細ページ。価格や走行距離、装備情報を掲載。`;

  return {
    title,
    description: desc,
  };
}

// SSG用パラメータ
export function generateStaticParams() {
  const cars = getAllInventory();
  return cars.map((car) => ({ id: car.id }));
}

export default function InventoryDetailPage(
  { params }: { params: { id: string } }
) {
  const cars = getAllInventory();
  const car = cars.find((item) => item.id === params.id);

  if (!car) {
    notFound();
  }

  const gallery = [
    {
      key: "main",
      label: "メイン",
      src: car.imageMain ?? car.image,
    },
    {
      key: "interior",
      label: "内装",
      src: car.imageInterior,
    },
    {
      key: "rear",
      label: "テール",
      src: car.imageRear,
    },
    {
      key: "engine",
      label: "エンジンルーム",
      src: car.imageEngine,
    },
  ].filter((item) => item.src);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-20 pt-8">
      {/* パンくずと戻る */}
      <div className="flex items-center justify-between text-[11px] text-neutral-400">
        <div className="flex items-center gap-1.5">
          <Link
            href="/"
            className="underline-offset-4 hover:underline"
          >
            HOME
          </Link>
          <span>/</span>
          <Link
            href="/inventory"
            className="underline-offset-4 hover:underline"
          >
            在庫車一覧
          </Link>
          <span>/</span>
          <span className="text-neutral-300">{car.title}</span>
        </div>
        <span className="tracking-[0.28em] uppercase">
          Inventory Detail
        </span>
      </div>

      {/* 上部ヘッダー */}
      <section className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-black/80 via-neutral-950 to-[#1a0b0b] p-5 shadow-[0_0_40px_rgba(0,0,0,0.7)] md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
              {car.maker}
            </p>
            <h1 className="text-xl font-semibold sm:text-2xl">
              {car.title}
            </h1>
            {car.catchCopy && (
              <p className="text-xs font-medium text-[#ecdab9]">
                {car.catchCopy}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2 text-right">
            <StatusBadge status={car.status} />
            <div>
              <p className="text-[11px] text-neutral-500">
                車両本体価格
              </p>
              <p className="text-xl font-semibold text-red-500 sm:text-2xl">
                {formatPriceYen(car.priceYen)}
              </p>
            </div>
          </div>
        </div>

        {car.shortDescription && (
          <p className="mt-4 text-xs leading-relaxed text-neutral-300 sm:text-sm">
            {car.shortDescription}
          </p>
        )}
      </section>

      {/* 画像ギャラリー */}
      {gallery.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold tracking-wide">
            フォトギャラリー
          </h2>

          {/* 横スクロールの大きな画像 */}
          <div className="relative overflow-x-auto">
            <div className="flex snap-x snap-mandatory gap-3 pb-2">
              {gallery.map((item) => (
                <div
                  key={item.key}
                  className="relative h-64 min-w-full snap-center overflow-hidden rounded-2xl border border-neutral-800 bg-black/80 sm:h-80"
                >
                  <Image
                    src={item.src as string}
                    alt={`${car.title} ${item.label}画像`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 800px, 100vw"
                    priority={item.key === "main"}
                  />
                  <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[11px] text-neutral-100">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ラベル行 */}
          <div className="flex flex-wrap gap-1.5 text-[11px] text-neutral-400">
            {gallery.map((item) => (
              <span
                key={item.key}
                className="rounded-full border border-neutral-700 bg-black/60 px-2.5 py-0.5"
              >
                {item.label}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 車両スペック */}
      <section className="space-y-4 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 p-5 md:p-6">
        <h2 className="text-sm font-semibold tracking-wide">
          車両情報
        </h2>

        <div className="grid gap-x-6 gap-y-2 text-[12px] text-neutral-200 sm:grid-cols-2 sm:text-sm">
          {car.year && (
            <SpecRow label="年式" value={`${car.year}年`} />
          )}
          {car.mileageKm && (
            <SpecRow
              label="走行距離"
              value={formatMileageKm(car.mileageKm)}
            />
          )}
          {car.color && (
            <SpecRow label="ボディカラー" value={car.color} />
          )}
          {car.grade && (
            <SpecRow label="グレード" value={car.grade} />
          )}
          {car.transmission && (
            <SpecRow label="ミッション" value={car.transmission} />
          )}
          {car.drive && (
            <SpecRow label="駆動方式" value={car.drive} />
          )}
          {car.engine && (
            <SpecRow label="エンジン" value={car.engine} />
          )}
          {car.specNote && (
            <SpecRow label="装備など" value={car.specNote} />
          )}
        </div>
      </section>

      {/* ライフスタイルコメントなど */}
      {(car.lifestyleNote || (car.tags && car.tags.length > 0)) && (
        <section className="space-y-4 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 p-5 md:p-6">
          {car.lifestyleNote && (
            <div className="space-y-1">
              <h2 className="text-sm font-semibold tracking-wide">
                補足情報
              </h2>
              <p className="text-[12px] leading-relaxed text-neutral-300 sm:text-sm">
                {car.lifestyleNote}
              </p>
            </div>
          )}

          {car.tags && car.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[12px] font-semibold tracking-wide text-neutral-300">
                タグ
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {car.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-800 bg-black/60 px-2.5 py-0.5 text-[10px] text-neutral-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 一覧に戻る */}
      <div className="mt-2 flex justify-center">
        <Link
          href="/inventory"
          className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-black/60 px-5 py-2 text-xs font-semibold tracking-wide text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900"
        >
          在庫車一覧に戻る
        </Link>
      </div>
    </main>
  );
}

type StatusBadgeProps = {
  status: "stock" | "sold" | "coming_soon";
};

function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "stock") {
    return (
      <span className="rounded-full border border-red-600/60 bg-red-600/15 px-3 py-1 text-[11px] font-medium text-red-400">
        在庫あり
      </span>
    );
  }
  if (status === "sold") {
    return (
      <span className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-[11px] font-medium text-neutral-400">
        成約済
      </span>
    );
  }
  return (
    <span className="rounded-full border border-amber-600/70 bg-amber-900/20 px-3 py-1 text-[11px] font-medium text-amber-300">
      入庫予定
    </span>
  );
}

type SpecRowProps = {
  label: string;
  value: string;
};

function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="min-w-[88px] text-[11px] text-neutral-500 sm:min-w-[96px]">
        {label}
      </span>
      <span className="flex-1 text-[12px] text-neutral-100 sm:text-sm">
        {value}
      </span>
    </div>
  );
}
