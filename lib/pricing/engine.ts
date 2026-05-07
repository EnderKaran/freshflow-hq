import { getAdjustedSalesForecast } from "../transactions/weatherService";

export interface PricingStrategy {
  rainyMultiplier: number;
  sunnyMultiplier: number;
  hotThreshold: number; // Örn: 30 derece üstü
}

const DEFAULT_STRATEGY: PricingStrategy = {
  rainyMultiplier: 0.9, // Yağmurlu havada gel-al azaldığı için %10 indirim
  sunnyMultiplier: 1.1, // Güneşli havada talep arttığı için %10 zam
  hotThreshold: 30,
};

export function calculateSmartPrice(
  basePrice: number, 
  category: string, 
  isRainy: boolean, 
  temp?: number
) {
  let multiplier = 1.0;

  // Yağmurlu Havada "Comfort Food" (Burger) Stratejisi
  if (isRainy && category === "Comfort") {
    multiplier = 1.15; // Eve sipariş talebi arttığı için fiyatı artır
  } else if (isRainy) {
    multiplier = 0.95; // Diğer ürünlerde genel teşvik indirimi
  }

  // Sıcaklık Stratejisi
  if (temp && temp > DEFAULT_STRATEGY.hotThreshold && category === "Cold") {
    multiplier = 1.20; // Çok sıcakta soğuk içeceklere %20 kâr marjı
  }

  return Number((basePrice * multiplier).toFixed(2));
}