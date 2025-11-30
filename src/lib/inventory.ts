// src/lib/inventory.ts
import inventoryRaw from "@/data/inventory.json";

export type InventoryStatus = "stock" | "sold" | "coming_soon";

export type InventoryItem = {
  id: string;
  /** 在庫カードや詳細ページで使う表示用タイトル */
  title: string;
  status: InventoryStatus;

  // 数値系
  priceYen?: number | null;
  mileageKm?: number | null;
  year?: number | null;

  // 車両情報
  maker?: string;
  model?: string;
  grade?: string;
  color?: string;
  engine?: string;
  transmission?: string;
  drive?: string;
  bodyType?: string;

  // 文章系
  catchCopy?: string;
  shortDescription?: string;
  lifestyleNote?: string;
  specNote?: string;
  description?: string;

  // 画像系
  image?: string; // 一覧などで使うサムネ
  imageMain?: string;
  imageInterior?: string;
  imageRear?: string;
  imageEngine?: string;

  // メタ
  slug?: string;
  tags?: string[];
};

// JSONからアプリで扱う形へ正規化
const inventory: InventoryItem[] = (inventoryRaw as any[]).map(
  (item: any): InventoryItem => {
    const titleFromParts = [item.maker, item.model, item.grade]
      .filter(Boolean)
      .join(" ");

    const title: string =
      item.title ??
      item.displayName ??
      item.name ??
      titleFromParts ||
      "在庫車両";

    const image: string | undefined =
      item.image ??
      item.thumbnailUrl ??
      item.imageMain ??
      undefined;

    return {
      id: String(item.id),
      title,
      status: (item.status as InventoryStatus) ?? "stock",

      priceYen: item.priceYen ?? item.price ?? null,
      mileageKm: item.mileageKm ?? item.mileage ?? null,
      year: item.year ?? null,

      maker: item.maker,
      model: item.model,
      grade: item.grade,
      color: item.color,
      engine: item.engine,
      transmission: item.transmission,
      drive: item.drive,
      bodyType: item.bodyType ?? item.segment ?? undefined,

      catchCopy: item.catchCopy,
      shortDescription: item.shortDescription,
      lifestyleNote: item.lifestyleNote,
      specNote: item.specNote,
      description: item.description ?? item.summary ?? item.lead,

      image,
      imageMain: item.imageMain,
      imageInterior: item.imageInterior,
      imageRear: item.imageRear,
      imageEngine: item.imageEngine,

      slug: item.slug,
      tags: item.tags,
    };
  }
);

export function getAllInventory(): InventoryItem[] {
  return inventory;
}

export function getInventoryById(id: string): InventoryItem | undefined {
  return inventory.find((item) => item.id === id);
}

export function formatPriceYen(value?: number | null): string {
  if (value == null) return "ASK";
  return `${value.toLocaleString("ja-JP")}万円`;
}

export function formatMileageKm(value?: number | null): string {
  if (value == null) return "不明";
  return `${value.toLocaleString("ja-JP")}km`;
}
