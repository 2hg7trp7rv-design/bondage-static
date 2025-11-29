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
const inventory: InventoryItem[] = (inventoryData as InventoryItem[]).map(
  (item) => ({
    ...item,
    title: item.title ?? item.displayName,
  })
);

/**
 * 在庫車を全件取得
 */
export function getAllInventory(): InventoryItem[] {
  return inventory;
}

/**
 * slug から 1 台取得
 */
export function getInventoryBySlug(slug: string): InventoryItem | undefined {
  return inventory.find((item) => item.slug === slug);
}

/**
 * ステータス別に一覧取得
 */
export function getInventoryByStatus(
  status: InventoryStatus
): InventoryItem[] {
  return inventory.filter((item) => item.status === status);
}
