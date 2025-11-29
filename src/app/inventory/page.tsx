// src/app/inventory/page.tsx
import type { Metadata } from "next";
import {
  getAllInventory,
  formatPriceYen,
  formatMileageKm,
} from "@/lib/inventory";

export const metadata: Metadata = {
  title: "在庫車一覧 | Auto Collection Bondage",
  description:
    "Auto Collection Bondage の在庫車一覧。軽トラからフェラーリ、レンジローバーまで、夜の色気と昼の温度差をそのまま並べたガレージ。",
};

export default function InventoryPage() {
  const cars = getAllInventory();

  const inStock = cars.filter((car) => car.status === "stock");
  const sold = cars.filter((car) => car.status === "sold");
  const comingSoon = cars.filter((car) => car.status === "coming_soon");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-20 pt-8">
      {/* タイトル + 概要 */}
      <section className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Inventory
        </p>
        <h1 className="text-2xl font-semibold sm:text-3xl">
          在庫車一覧
        </h1>
        <p className="text-sm leading-relaxed text-neutral-300">
          軽トラで荷台にいなりちゃんを乗せて海まで行く週末も、
          フェラーリで深夜の国道を流す夜も、同じガレージからスタートする。
          そんな「振れ幅」をそのまま並べた在庫リスト。
        </p>

        {/* シンプルなステータス概要 */}
        <div className="flex flex-wrap gap-2 text-[11px] text-neutral-400">
          <span className="rounded-full border border-neutral-800 bg-black/60 px-3 py-1">
            在庫中: {inStock.length} 台
          </span>
          <span className="rounded-full border border-neutral-800 bg-black/60 px-3 py-1">
            商談・成約済: {sold.length} 台
          </span>
          <span className="rounded-full border border-neutral-800 bg-black/60 px-3 py-1">
            入庫予定: {comingSoon.length} 台
          </span>
        </div>
      </section>

      {/* 在庫リスト */}
      <section className="space-y-4">
        {cars.length === 0 && (
          <p className="rounded-2xl border border-dashed border-neutral-800 bg-black/60 px-5 py-6 text-sm text-neutral-300">
            まだ在庫データは登録されていません。
            まずは <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-[11px]">
              src/data/inventory.json
            </code>{" "}
            に1台ずつ追加していきましょう。
          </p>
        )}

        <ul className="flex flex-col gap-4">
          {cars.map((car) => (
            <li
              key={car.id}
              className="overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-black/80 via-neutral-950 to-[#1a0b0b] shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:gap-5 sm:p-5">
                {/* 画像エリア（あとで Next/Image に差し替え予定） */}
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/80 sm:w-48">
                  {/* 画像はあとで差し替え。今はプレースホルダ */}
                  <div className="flex h-full items-center justify-center text-[11px] text-neutral-500">
                    {car.image ? (
                      <span>画像: {car.image}</span>
                    ) : (
                      <span>画像はあとで追加</span>
                    )}
                  </div>
                </div>

                {/* テキストエリア */}
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                        {car.maker}
                      </p>
                      <h2 className="text-base font-semibold sm:text-lg">
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
                      <p className="text-[11px] text-neutral-500">車両本体価格</p>
                      <p className="text-lg font-semibold text-red-500">
                        {formatPriceYen(car.priceYen)}
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
      </section>
    </div>
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
