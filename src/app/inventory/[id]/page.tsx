// src/app/inventory/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getInventoryById,
  formatMileageKm,
  formatPriceYen,
  type InventoryItem,
} from "@/lib/inventory";
import { InventoryGallery } from "@/components/inventory/InventoryGallery";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const car = getInventoryById(params.id);
  if (!car) {
    return {
      title: "在庫車が見つかりません | Auto Collection Bandage",
    };
  }
  return {
    title: `${car.title} | Auto Collection Bandage`,
    description: `${car.maker} ${car.title}の在庫詳細ページ`,
  };
}

export default function InventoryDetailPage({ params }: PageProps) {
  const car = getInventoryById(params.id);

  if (!car) {
    notFound();
  }

  const c = car as InventoryItem;

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-8">
      {/* ヘッダー */}
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          INVENTORY DETAIL
        </p>
        <h1 className="text-2xl font-semibold sm:text-3xl">{c.title}</h1>
        <p className="text-sm text-neutral-300">
          Auto Collection Bandageの在庫車詳細。
        </p>
      </header>

      {/* ギャラリー(main / 内装 / テール / エンジンルーム) */}
      <section className="mt-6">
        <InventoryGallery car={c} />
      </section>

      {/* 基本情報 + 価格 */}
      <section className="mt-6 grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-3 rounded-2xl border border-neutral-800 bg-black/70 p-5">
          <h2 className="text-base font-semibold">基本情報</h2>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-neutral-200">
            {c.year && (
              <>
                <dt className="text-neutral-500">年式</dt>
                <dd>{c.year}年</dd>
              </>
            )}
            {c.mileageKm && (
              <>
                <dt className="text-neutral-500">走行距離</dt>
                <dd>{formatMileageKm(c.mileageKm)}</dd>
              </>
            )}
            {c.color && (
              <>
                <dt className="text-neutral-500">カラー</dt>
                <dd>{c.color}</dd>
              </>
            )}
            {c.grade && (
              <>
                <dt className="text-neutral-500">グレード</dt>
                <dd>{c.grade}</dd>
              </>
            )}
            {c.transmission && (
              <>
                <dt className="text-neutral-500">ミッション</dt>
                <dd>{c.transmission}</dd>
              </>
            )}
            {c.drive && (
              <>
                <dt className="text-neutral-500">駆動方式</dt>
                <dd>{c.drive}</dd>
              </>
            )}
            <>
              <dt className="text-neutral-500">ステータス</dt>
              <dd>
                {c.status === "stock"
                  ? "在庫あり"
                  : c.status === "sold"
                  ? "成約済"
                  : "入庫予定"}
              </dd>
            </>
          </dl>
        </div>

        <div className="space-y-3 rounded-2xl border border-neutral-800 bg-black/70 p-5">
          <h2 className="text-base font-semibold">価格</h2>
          <p className="text-[11px] text-neutral-500">車両本体価格</p>
          <p className="text-2xl font-semibold text-red-500">
            {formatPriceYen(c.priceYen)}
          </p>
        </div>
      </section>

      {/* 説明文 */}
      {(c.catchCopy || c.shortDescription || c.lifestyleNote) && (
        <section className="mt-8 space-y-3 rounded-2xl border border-neutral-800 bg-black/70 p-5 text-sm leading-relaxed text-neutral-200">
          {c.catchCopy && (
            <p className="text-[13px] font-semibold text-neutral-50">
              {c.catchCopy}
            </p>
          )}
          {c.shortDescription && <p>{c.shortDescription}</p>}
          {c.lifestyleNote && <p>{c.lifestyleNote}</p>}
        </section>
      )}
    </main>
  );
}
