// src/app/inventory/InventoryListClient.tsx
"use client";

import { useMemo, useState, MouseEvent } from "react";
import type { InventoryItem, InventoryStatus } from "@/lib/inventory";
import Link from "next/link";

type Props = {
  cars: InventoryItem[];
  formatMileageKm: (value: number | null | undefined) => string;
  formatPriceYen: (value: number | null | undefined) => string;
};

type SortKey = "none" | "stock" | "sold";

export function InventoryListClient({
  cars,
  formatMileageKm,
  formatPriceYen,
}: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("none");

  const inStockCount = cars.filter((car) => car.status === "stock").length;
  const soldCount = cars.filter((car) => car.status === "sold").length;

  const sortedCars = useMemo(() => {
    if (sortKey === "none") return cars;

    const targetStatus: InventoryStatus =
      sortKey === "stock" ? "stock" : "sold";

    return [...cars].sort((a, b) => {
      const aHit = a.status === targetStatus;
      const bHit = b.status === targetStatus;
      if (aHit === bHit) return 0;
      return aHit ? -1 : 1;
    });
  }, [cars, sortKey]);

  const handleStatusClick = (e: MouseEvent<HTMLDivElement>) => {
    const span = (e.target as HTMLElement).closest<HTMLElement>(
      "[data-sort-label]"
    );
    if (!span) return;

    if (span.dataset.sortKey === "stock") {
      setSortKey((prev) => (prev === "stock" ? "none" : "stock"));
    } else if (span.dataset.sortKey === "sold") {
      setSortKey((prev) => (prev === "sold" ? "none" : "sold"));
    }
  };

  return (
    <section
      aria-label="在庫車一覧"
      className="space-y-5 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-black/80 to-neutral-900/70 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:p-6"
    >
      {/* 上部のソートラベル（クリック検知用ラッパ） */}
      <div
        className="mb-4 flex flex-wrap gap-2 text-[12px] text-neutral-200/90"
        onClick={handleStatusClick}
      >
        <span className="mr-2 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
          SORT
        </span>
        <span
          data-sort-label
          data-sort-key="stock"
          className={`inline-flex cursor-pointer items-center rounded-full border px-3 py-1 ${
            sortKey === "stock"
              ? "border-red-500 bg-red-600/80 text-white"
              : "border-red-500/60 bg-black/40 text-neutral-100"
          }`}
        >
          在庫あり : {inStockCount}台
        </span>
        <span
          data-sort-label
          data-sort-key="sold"
          className={`inline-flex cursor-pointer items-center rounded-full border px-3 py-1 ${
            sortKey === "sold"
              ? "border-red-500 bg-red-600/80 text-white"
              : "border-red-500/60 bg-black/40 text-neutral-100"
          }`}
        >
          商談成約済 : {soldCount}台
        </span>
      </div>

      {/* 在庫カード */}
      <div className="grid gap-4 md:grid-cols-2">
        {sortedCars.map((car) => (
          <article
            key={car.id}
            className="flex flex-col gap-3 rounded-2xl border border-neutral-700/70 bg-black/60 p-4"
          >
            <header className="space-y-1">
              <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                {car.maker}
              </div>
              <h2 className="text-sm font-semibold text-neutral-50">
                {car.name}
              </h2>
              {car.grade && (
                <div className="text-[11px] text-neutral-400">{car.grade}</div>
              )}
            </header>

            {/* スペック */}
            <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-neutral-300">
              {car.year && (
                <>
                  <dt className="text-neutral-500">年式</dt>
                  <dd>{car.year}年</dd>
                </>
              )}
              {car.bodyType && (
                <>
                  <dt className="text-neutral-500">ボディ</dt>
                  <dd>{car.bodyType}</dd>
                </>
              )}
              {car.mileageKm != null && (
                <>
                  <dt className="text-neutral-500">走行距離</dt>
                  <dd>{formatMileageKm(car.mileageKm)}</dd>
                </>
              )}
              {car.priceYen != null && (
                <>
                  <dt className="text-neutral-500">車両価格</dt>
                  <dd>{formatPriceYen(car.priceYen)}</dd>
                </>
              )}
              {car.color && (
                <>
                  <dt className="text-neutral-500">色</dt>
                  <dd>{car.color}</dd>
                </>
              )}
            </dl>

            {/* ステータス */}
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <StatusBadge status={car.status} />
              <div className="flex gap-2 text-neutral-400">
                {car.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-700 px-2 py-[2px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 詳細ページへのリンクが必要ならここに追加 */}
            {/* <Link href={`/inventory/${car.id}`} className="mt-2 text-[11px] text-red-400 underline">
              詳細を見る
            </Link> */}
          </article>
        ))}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: InventoryStatus }) {
  if (status === "stock") {
    return (
      <span className="rounded-full border border-emerald-500/80 bg-emerald-900/30 px-3 py-1 text-[11px] font-medium text-emerald-200">
        在庫あり
      </span>
    );
  }
  if (status === "sold") {
    return (
      <span className="rounded-full border border-neutral-600 bg-neutral-900 px-3 py-1 text-[11px] font-medium text-neutral-300">
        商談成約済
      </span>
    );
  }
  return (
    <span className="rounded-full border border-amber-600/70 bg-amber-900/20 px-3 py-1 text-[11px] font-medium text-amber-300">
      入庫予定
    </span>
  );
}
