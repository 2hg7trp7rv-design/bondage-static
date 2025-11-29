// src/lib/inventory.ts
import inventoryData from "@/data/inventory.json";

export type InventoryStatus = "available" | "reserved" | "sold";

export type InventoryItem = {
  id: string;
  slug: string;

  /**
   * 管理用のタイトル（任意）。
   * 未指定の場合は displayName をそのまま使う。
   */
  title?: string;

  /**
   * 車種カテゴリー（例: "KEI_TRUCK", "SUPERCAR" など）
   * まだ決めきれていないので任意にしておく。
   */
  category?: string;

  /**
   * カードに大きく表示する「一言キャッチ」。
   * JSON の displayName と 1:1 で対応。
   */
  displayName: string;

  maker: string;
  model: string;
  year: number;
  grade: string;
  priceYen: number;
  mileageKm: number;
  color: string;
  status: InventoryStatus;
  tags: string[];
  thumbnailUrl: string;
  shortDescription: string;
  lifestyleNote: string;
};

// inventory.json を型付きで扱う。
// title が無い場合は displayName をタイトルとして補完。
const inventoryInternal: InventoryItem[] = (inventoryData as InventoryItem[]).map(
  (item) => ({
    ...item,
    title: item.title ?? item.displayName,
  })
);

/**
 * 在庫車を全件取得
 */
export function getAllInventory(): InventoryItem[] {
  return inventoryInternal;
}

/**
 * slug から 1 台取得
 */
export function getInventoryBySlug(slug: string): InventoryItem | undefined {
  return inventoryInternal.find((item) => item.slug === slug);
}

/**
 * ステータス別に一覧取得
 */
export function getInventoryByStatus(
  status: InventoryStatus
): InventoryItem[] {
  return inventoryInternal.filter((item) => item.status === status);
}

/**
 * 価格表示用フォーマッタ（例: ¥680,000）
 */
export function formatPriceYen(priceYen: number): string {
  return `¥${priceYen.toLocaleString("ja-JP")}`;
}

/**
 * 走行距離表示用フォーマッタ（例: 72,000km）
 */
export function formatMileageKm(mileageKm: number): string {
  return `${mileageKm.toLocaleString("ja-JP")}km`;
}
