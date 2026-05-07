export interface WeatherData {
  isRainy: boolean;
  temp: number;
  condition: string;
}

interface WeatherCondition {
  main: string;
  description: string;
}

/**
 * Belirtilen şehir için güncel hava durumunu getirir ve 1 saat (3600s) cache'ler.
 */
export async function getAdjustedSalesForecast(baseExpectedSales: number, city: string = 'Bursa') {
  let expectedSales = baseExpectedSales;
  let message = "Normal hava koşulları";
  const weather: WeatherData = { isRainy: false, temp: 20, condition: 'Clear' };

  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    
    if (!apiKey) {
      console.warn("⚠️ OPENWEATHERMAP_API_KEY bulunamadı. Mock veri ile devam ediliyor.");
      return { expectedSales, ...weather, message: "API Key eksik (Simulation Mode)" };
    }

    // Next.js 15 Fetch Caching: 1 saat boyunca aynı veriyi kullanır, API kotasını korur.
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, 
      { next: { revalidate: 3600 } }
    );

    if (response.ok) {
      const data = await response.json();
      const conditions = data.weather?.map((w: WeatherCondition) => w.main.toLowerCase()) || [];
      
      weather.isRainy = conditions.some((c: string) => 
        c.includes('rain') || c.includes('drizzle') || c.includes('thunderstorm')
      );
      weather.temp = data.main.temp;
      weather.condition = data.weather[0]?.main || 'Clear';

      // Satış Tahmin Algoritması
      if (weather.isRainy) {
        expectedSales = expectedSales * 0.8; // Yağmurlu havada fiziksel trafik %20 düşer
        message = "Hava yağmurlu: Fiziksel satışlarda %20 düşüş öngörüldü.";
      } else if (weather.temp > 30) {
        expectedSales = expectedSales * 1.1; // Çok sıcakta soğuk içecek talebiyle ciro artar
        message = "Hava sıcak: Soğuk ürün talebiyle %10 artış öngörüldü.";
      }
    }
  } catch (error) {
    console.error("Hava durumu servisi hatası:", error);
  }

  return {
    expectedSales,
    ...weather,
    message
  };
}