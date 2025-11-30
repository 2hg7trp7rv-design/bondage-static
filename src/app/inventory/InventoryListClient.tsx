"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  getAllInventory,
  type InventoryItem,
  type InventoryStatus,
  formatMileageKm as formatMileageKmDefault,
  formatPriceYen as formatPriceYenDefault,
} from "@/lib/inventory";

type InventoryListClientProps = {
  items?: InventoryItem[];
};

const STATUS_LABEL: Record<InventoryStatus, string> = {
  stock: "在庫あり",
  sold: "SOLD OUT",
  coming_soon: "入庫予定",
};

export function InventoryListClient({
  items,
}: InventoryListClientProps) {
  const [statusFilter, setStatusFilter] = useState<InventoryStatus | "all">(
    "all"
  );

  const sourceItems = useMemo(
    () => items ?? getAllInventory(),
    [items]
  );

  const filtered = useMemo(
    () =>
      statusFilter === "all"
        ? sourceItems
        : sourceItems.filter((item) => item.status === statusFilter),
    [sourceItems, statusFilter]
  );

  return (
    <div className="space-y-6">
      {/* フィルタボタン */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`rounded-full px-3 py-1 text-xs ${
            statusFilter === "all"
              ? "bg-red-500 text-black"
              : "bg-neutral-800 text-neutral-200"
          }`}
        >
          すべて
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("stock")}
          className={`rounded-full px-3 py-1 text-xs ${
            statusFilter === "stock"
              ? "bg-red-500 text-black"
              : "bg-neutral-800 text-neutral-200"
          }`}
        >
          在庫あり
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("coming_soon")}
          className={`rounded-full px-3 py-1 text-xs ${
            statusFilter === "coming_soon"
              ? "bg-red-500 text-black"
              : "bg-neutral-800 text-neutral-200"
          }`}
        >
          入庫予定
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("sold")}
          className={`rounded-full px-3 py-1 text-xs ${
            statusFilter === "sold"
              ? "bg-red-500 text-black"
              : "bg-neutral-800 text-neutral-200"
          }`}
        >
          SOLD
        </button>
      </div>

      {/* 在庫カード一覧 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((car) => {
          const title = car.title;
          const thumb = car.imageMain ?? car.image;

          return (
            <Link
              key={car.id}
              href={`/inventory/${car.id}`}
              className="group rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:border-red-400/80 hover:bg-neutral-900/80"
            >
              <div className="flex flex-col gap-3">
                {thumb && (
                  <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/80">
                    <Image
                      src={thumb}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute left-3 top-3 inline-flex rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      {STATUS_LABEL[car.status]}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <h3 className="text-base font-semibold tracking-wide text-white">
                    {title}
                  </h3>
                  {car.maker && car.model && (
                    <p className="text-xs text-neutral-400">
                      {car.maker} / {car.model}
                    </p>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-300">
                  <span className="font-semibold">
                    {formatPriceYenDefault(car.priceYen)}
                  </span>

                  <span className="inline-flex items-center gap-1 text-neutral-400">
                    {car.year && <span>{car.year}年式</span>}
                    {car.mileageKm != null && (
                      <>
                        <span>・</span>
                        <span>
                          {formatMileageKmDefault(car.mileageKm)}
                        </span>
                      </>
                    )}
                  </span>

                  {car.bodyType && (
                    <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-300">
                      {car.bodyType}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
