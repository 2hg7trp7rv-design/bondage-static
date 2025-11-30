// src/app/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllInventory } from "@/lib/inventory";

export const metadata: Metadata = {
  title: "AUTO COLLECTION BONDAGE | Digital Garage",
  description:
    "AUTO COLLECTION BONDAGEのデジタルガレージ。ハイパーカーから実用車まで、同じ温度で並べた在庫と世界観を届けます。",
};

export default function HomePage() {
  const cars = getAllInventory();
  const inStockCount = cars.filter((car) => car.status === "stock").length;
  const soldCount = cars.filter((car) => car.status === "sold").length;

  return (
    <main className="relative min-h-screen bg-black text-neutral-100">
      {/* フル画面ヒーロー(ブガッティの写真だけを見せる) */}
      <section className="relative h-[92vh] w-full overflow-hidden">
        <Image
          src="/images/inventory/bugatti-chiron-main.jpg"
          alt="ブガッティ シロン メインビュー"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* 下側だけを少し暗くしてテキストを載せるレイヤー */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* テキストオーバーレイ(画面下部) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-10">
          <div className="pointer-events-auto mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:px-6">
            <p className="text-[11px] font-semibold tracking-[0.26em] text-neutral-300">
              DIGITAL INDEPENDENCE
            </p>
            <h1 className="text-2xl font-semibold leading-snug sm:text-3xl">
              夜のガレージと昼の生活のあいだにある場所。
            </h1>
            <p className="max-w-xl text-xs leading-relaxed text-neutral-200 sm:text-sm">
              ブガッティを眺める夜も、実用車で生活を回す日常も、同じ1枚のWEBで完結させるためのデジタルガレージ。
              AUTO COLLECTION BONDAGEは、そのまま商品ページになる在庫リストと、世界観を崩さないビジュアルで組み上げます。
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-neutral-200">
              <span className="rounded-full border border-neutral-700 bg-black/70 px-3 py-1">
                在庫あり:{inStockCount}台
              </span>
              <span className="rounded-full border border-neutral-700 bg-black/70 px-3 py-1">
                商談成約済:{soldCount}台
              </span>
              <Link
                href="/inventory"
                className="ml-auto rounded-full border border-red-600/70 bg-red-600/70 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-neutral-50 hover:bg-red-600"
              >
                在庫車一覧を見る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
