// src/lib/inventory.ts

import inventoryRaw from "@/data/inventory.json";

export type InventoryStatus = "stock" | "sold" | "coming_soon";

export type InventoryItem = {
  id: string;
  name: string;
  maker: string;
  status: InventoryStatus;

  // 追加情報（あるものだけ入れればOK）
  grade?: string;
  bodyType?: string;
  year?: number;
  mileageKm?: number | null;
  priceYen?: number | null;
  color?: string;
  drive?: string;
  transmission?: string;

  // ライフスタイルコメント・キャッチコピーなど
  shortDescription?: string;
  catchCopy?: string;
  lifestyleNote?: string;

  // タグや在庫カードで使う情報
  tags?: string[];

  // 在庫カードで画像を出すためのプロパティ
  image?: string;
};

// JSON を型付き配列として扱う
const inventoryData = inventoryRaw as InventoryItem[];

// 在庫一覧を取得
export function getInventory(): InventoryItem[] {
  return inventoryData;
}

// ステータスで絞り込み
export function getInventoryByStatus(status: InventoryStatus): InventoryItem[] {
  return inventoryData.filter((item) => item.status === status);
}

// id で1件取得（必要に応じて使用）
export function getInventoryById(id: string): InventoryItem | undefined {
  return inventoryData.find((item) => item.id === id);
}
