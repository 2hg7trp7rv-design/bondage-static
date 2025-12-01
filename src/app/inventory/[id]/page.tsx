// src/app/inventory/[id]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllInventory,
  getInventoryById,
  formatMileageKm,
  formatPriceYen,
} from "@/lib/inventory";
import { DetailGallery } from "@/components/inventory/DetailGallery";

type RouteParams = {
  id: string;
};

// SSG用: /inventory/[id] の静的パスを生成
export function generateStaticParams(): RouteParams[] {
  return getAllInventory().map((car) => ({
    id: car.slug ?? car.id,
  }));
}

// SEO用メタデータ
export function generateMetadata(props: any): Metadata {
  const params = props.params as RouteParams;
  const car = getInventoryById(params.id);

  if (!car) {
    return {
      title: "在庫車両が見つかりません | Auto Collection Bondage",
      description: "指定された在庫車両は現在登録されていません。",
    };
  }

  const title = `${car.title} | Inventory | Auto Collection Bondage`;
  const description =
    car.description ??
    `${car.maker ?? ""} ${car.model ?? ""}の在庫車両情報です。`.trim();

  return {
    title,
    description,
  };
}

export default function InventoryDetailPage(props: any) {
  const params = props.params as RouteParams;
  const car = getInventoryById(params.id);

  if (!car) {
    notFound();
  }

  const priceLabel = formatPriceYen(car.priceYen);
  const mileageLabel = formatMileageKm(car.mileageKm);

  return (
    <main className="min-h-screen bg-[#050506] text-neutral-100">
      {/* ページ共通の左右余白コンテナ */}
      <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 md:px-6">
        {/* パンくず */}
        <nav
          aria-label="パンくずリスト"
          className="mb-4 text-xs text-neutral-500"
        >
          <Link href="/" className="hover:text-neutral-200">
            Home
          </Link>
          <span className="mx-1">/</span>
          <Link href="/inventory" className="hover:text-neutral-200">
            Inventory
          </Link>
          <span className="mx-1">/</span>
          <span className="text-neutral-300">{car.title}</span>
        </nav>

        {/* 上段: ギャラリー+詳細カード */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* 左: ギャラリー＋説明 */}
          <section className="space-y-5">
            <div className="rounded-[32px] border border-neutral-800 bg-gradient-to-b from-neutral-900 via-black to-neutral-900 p-3 md:p-4">
              <DetailGallery
                main={car.imageMain ?? car.image ?? ""}
                interior={car.imageInterior}
                rear={car.imageRear}
                engine={car.imageEngine}
                alt={car.title}
              />
            </div>

            {car.description && (
              <div className="rounded-3xl border border-neutral-800 bg-black/70 p-5 text-sm leading-relaxed text-neutral-200">
                {car.description}
              </div>
            )}
          </section>

          {/* 右: スペック・価格・タグなど */}
          <aside className="space-y-5">
            <section className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-black/90 via-black/80 to-neutral-950 p-5 shadow-[0_0_45px_rgba(0,0,0,0.7)]">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-neutral-500">
                Inventory Detail
              </p>
              <h1 className="mb-4 text-xl font-semibold leading-snug">
                {car.title}
              </h1>

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-neutral-400">価格</dt>
                  <dd className="font-semibold text-[#ecdab9]">
                    {priceLabel}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-400">走行距離</dt>
                  <dd>{mileageLabel}</dd>
                </div>
                {car.year && (
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">年式</dt>
                    <dd>{car.year}年</dd>
                  </div>
                )}
                {car.color && (
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">ボディカラー</dt>
                    <dd>{car.color}</dd>
                  </div>
                )}
                {car.engine && (
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">エンジン</dt>
                    <dd className="text-right">{car.engine}</dd>
                  </div>
                )}
                {car.drive && (
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">駆動方式</dt>
                    <dd>{car.drive}</dd>
                  </div>
                )}
                {car.transmission && (
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">トランスミッション</dt>
                    <dd>{car.transmission}</dd>
                  </div>
                )}
                {car.tags && car.tags.length > 0 && (
                  <div className="pt-2">
                    <dt className="mb-1 text-neutral-400">タグ</dt>
                    <dd className="flex flex-wrap gap-1">
                      {car.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-neutral-700 bg-black/50 px-2 py-0.5 text-[11px] text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-5 space-y-2 text-[11px] text-neutral-400">
                <p>
                  この車両へのお問い合わせは、Instagram DMまたはお電話にてご連絡ください。
                </p>
              </div>
            </section>

            {car.lifestyleNote && (
              <section className="rounded-3xl border border-neutral-800 bg-black/70 p-4 text-[12px] leading-relaxed text-neutral-300">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  Lifestyle Note
                </p>
                <p>{car.lifestyleNote}</p>
              </section>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
