// src/app/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getAllInventory,
  type InventoryItem,
  formatMileageKm,
  formatPriceYen,
} from "@/lib/inventory";

export const metadata: Metadata = {
  title: "AUTO COLLECTION BONDAGE | Digital Garage",
  description:
    "AUTO COLLECTION BONDAGE の在庫車と世界観をシンプルに伝えるトップページ。",
};

export default function HomePage() {
  const cars = getAllInventory();
  const stockCars = cars.filter((car) => car.status === "stock");
  const featured: InventoryItem | undefined = stockCars[0] ?? cars[0];

  const inStockCount = stockCars.length;

  const featuredImage =
    featured?.image ??
    "/images/inventory/bugatti-chiron-main.jpg";

  return (
    <main className="min-h-screen bg-black text-neutral-100">
      {/* ヒーロー：背景フルサイズ＋ロゴタイポのみ */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden border-b border-neutral-900">
        {/* 背景画像 */}
        <div className="absolute inset-0">
          <Image
            src={featuredImage}
            alt={featured?.title ?? "Auto Collection Bondage"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
        </div>

        {/* タイポグラフィ */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-300">
            Auto Collection
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[0.08em] text-neutral-50 sm:text-5xl">
            Bondage
          </h1>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-neutral-300 sm:text-sm">
            夜のガレージと昼の生活のあいだにある場所。
            まずはこの1枚から、在庫車と世界観を覗いてください。
          </p>

          <div className="mt-8 flex gap-3">
            <Link
              href="/inventory"
              className="rounded-full border border-red-600/80 bg-black/70 px-6 py-2 text-xs font-semibold tracking-[0.22em] text-neutral-50 hover:bg-red-600/20"
            >
              在庫車一覧
            </Link>
          </div>
        </div>
      </section>

      {/* 在庫車一覧セクション（1台ピックアップ＋フッター的要素） */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        <header className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xs font-semibold tracking-[0.32em] text-neutral-400">
            在庫車一覧
          </h2>
          <span className="text-[11px] text-neutral-500">
            現在の在庫数: {inStockCount}台
          </span>
        </header>

        {featured && (
          <Link
            href={`/inventory/${featured.id}`}
            className="block overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/80 shadow-[0_0_40px_rgba(0,0,0,0.7)]"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={featuredImage}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 960px, 100vw"
              />
            </div>

            <div className="flex flex-col gap-2 px-4 pb-4 pt-3 text-sm sm:px-5 sm:pb-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[13px] font-medium text-neutral-50">
                  {featured.title}
                </p>
                <p className="text-[11px] text-neutral-400">
                  {featured.year ? `${featured.year}年式` : "年式不明"}
                  {featured.mileageKm != null && " ・ "}
                  {featured.mileageKm != null && formatMileageKm(featured.mileageKm)}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-300">
                <span className="rounded-full border border-neutral-700 bg-black/70 px-3 py-1">
                  価格: {formatPriceYen(featured.priceYen ?? null)}
                </span>
                <span className="rounded-full border border-neutral-700 bg-black/70 px-3 py-1">
                  {featured.maker ?? ""} {featured.model ?? ""}
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* 下部のラベルエリア */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-[11px] text-neutral-300">
          <Link
            href="/inventory"
            className="rounded-full border border-neutral-700 bg-black px-5 py-2 font-semibold tracking-[0.22em] hover:border-red-600 hover:bg-neutral-900"
          >
            在庫車一覧
          </Link>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-neutral-700 bg-black/80 px-4 py-1">
              輸入車・国産車
            </span>
            <span className="rounded-full border border-neutral-700 bg-black/80 px-4 py-1">
              在庫あり:{inStockCount}台
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
