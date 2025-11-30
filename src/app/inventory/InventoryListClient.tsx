// src/app/inventory/InventoryListClient.tsx
"use client";

import { useMemo, useState, MouseEvent } from "react";// src/app/inventory/InventoryListClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  type InventoryItem,
  formatMileageKm,
  formatPriceYen,
} from "@/lib/inventory";

type InventoryListClientProps = {
  cars: InventoryItem[];
};

type FilterKey = "all" | "stock" | "sold";

export function InventoryListClient({ cars }: InventoryListClientProps) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const inStock = cars.filter((car) => car.status === "stock");
  const sold = cars.filter((car) => car.status === "sold");
  const comingSoon = cars.filter((car) => car.status === "coming_soon");

  const filteredCars =
    filter === "stock"
      ? inStock
      : filter === "sold"
      ? sold
      : cars;

  const pillBase =
    "cursor-pointer rounded-full border border-neutral-800 bg-black/60 px-3 py-1 text-[11px] transition-colors";
  const pillActive =
    "border-red-600/70 bg-red-600/15 text-red-300";
  const pillInactive = "text-neutral-400 hover:border-neutral-600";

  return (
    <section className="space-y-4">
      {/* ステータスフィルタ（在庫あり・商談成約済はクリックで絞り込み） */}
      <div className="flex flex-wrap gap-2 text-[11px] text-neutral-400">
        <button
          type="button"
          onClick={() =>
            setFilter((prev) => (prev === "stock" ? "all" : "stock"))
          }
          className={`${pillBase} ${
            filter === "stock" ? pillActive : pillInactive
          }`}
        >
          在庫あり : {inStock.length}台
        </button>
        <button
          type="button"
          onClick={() =>
            setFilter((prev) => (prev === "sold" ? "all" : "sold"))
          }
          className={`${pillBase} ${
            filter === "sold" ? pillActive : pillInactive
          }`}
        >
          商談成約済 : {sold.length}台
        </button>
        <span className="rounded-full border border-neutral-800 bg-black/60 px-3 py-1 text-[11px] text-neutral-400">
          入庫予定 : {comingSoon.length}台
        </span>
      </div>

      {/* 在庫リスト */}
      {filteredCars.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-neutral-800 bg-black/60 px-5 py-6 text-sm text-neutral-300">
          現在、選択中のステータスに該当する在庫はありません。
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {filteredCars.map((car) => (
            <li
              key={car.id}
              className="overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-black/80 via-neutral-950 to-[#1a0b0b] shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:gap-5 sm:p-5">
                {/* 画像エリア */}
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/80 sm:w-48">
                  {car.image ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={car.image}
                        alt={car.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 192px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-[11px] text-neutral-500">
                      画像はあとで追加
                    </div>
                  )}
                </div>

                {/* テキストエリア */}
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                        {car.maker}
                      </p>
                      <h2 className="text-sm font-semibold text-neutral-50 sm:text-lg">
                        {car.title}
                      </h2>
                    </div>
                    <StatusBadge status={car.status} />
                  </div>

                  {car.catchCopy && (
                    <p className="text-xs font-medium text-[#ecdab9]">
                      {car.catchCopy}
                    </p>
                  )}

                  {car.shortDescription && (
                    <p className="text-xs leading-relaxed text-neutral-300 sm:text-sm">
                      {car.shortDescription}
                    </p>
                  )}

                  <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-neutral-300 sm:text-xs">
                    {car.year && (
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-500">年式</span>
                        <span>{car.year}年</span>
                      </div>
                    )}
                    {car.mileageKm && (
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-500">走行</span>
                        <span>{formatMileageKm(car.mileageKm)}</span>
                      </div>
                    )}
                    {car.transmission && (
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-500">ミッション</span>
                        <span>{car.transmission}</span>
                      </div>
                    )}
                    {car.drive && (
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-500">駆動</span>
                        <span>{car.drive}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-2 flex items-end justify-between">
                    <div className="text-xs text-neutral-400">
                      {car.color && <div>カラー: {car.color}</div>}
                      {car.grade && <div>グレード: {car.grade}</div>}
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-neutral-500">
                        車両本体価格
                      </p>
                      <p className="text-lg font-semibold text-red-500">
                        {car.priceYen != null
                          ? formatPriceYen(car.priceYen)
                          : "応談"}
                      </p>
                    </div>
                  </div>

                  {car.lifestyleNote && (
                    <p className="mt-2 border-t border-neutral-900 pt-2 text-[11px] leading-relaxed text-neutral-400">
                      {car.lifestyleNote}
                    </p>
                  )}

                  {car.tags && car.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {car.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-neutral-800 bg-black/60 px-2.5 py-0.5 text-[10px] text-neutral-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

type StatusBadgeProps = {
  status: InventoryItem["status"];
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
  if (status === "coming_soon") {
    return (
      <span className="rounded-full border border-amber-600/70 bg-amber-900/20 px-3 py-1 text-[11px] font-medium text-amber-300">
        入庫予定
      </span>
    );
  }
  return null;
}

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
