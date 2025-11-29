// src/lib/inventory.ts
import inventoryData from "@/data/inventory.json";

export type InventoryStatus = "stock" | "sold" | "coming_soon";

export type InventoryCategory =
  | "kei"
  | "domestic"
  | "import"
  | "truck"
  | "sports"
  | "suv"
  | "other";

export type InventoryItem = {
  id: string;
  title: string;
  maker: string;
  category: InventoryCategory;
  status: InventoryStatus;
  grade?: string;
  year?: number;
  mileageKm?: number;
  color?: string;
  priceYen?: number;
  transmission?: string;
  drive?: string;
  image?: string;
  tags?: string[];
  catchCopy?: string;
  shortDescription?: string;
  lifestyleNote?: string;
};

// inventory.json をそのまま型付けして扱う
const inventory = inventoryData as InventoryItem[];

/**
 * 在庫車を全件取得
 */
export function getAllInventory(): InventoryItem[] {
  return inventory;
}

/**
 * ステータスごとにフィルタ
 */
export function getInventoryByStatus(status: InventoryStatus): InventoryItem[] {
  return inventory.filter((car) => car.status === status);
}

/**
 * 表示用に価格をフォーマット（万円表記）
 */
export function formatPriceYen(priceYen?: number): string {
  if (!priceYen || priceYen <= 0) return "ASK";
  const man = Math.round(priceYen / 10000);
  return `${man.toLocaleString("ja-JP")}万円`;
}

/**
 * 走行距離の表示用
 */
export function formatMileageKm(mileageKm?: number): string {
  if (!mileageKm || mileageKm <= 0) return "走行少なめ";
  return `${mileageKm.toLocaleString("ja-JP")} km`;
}
