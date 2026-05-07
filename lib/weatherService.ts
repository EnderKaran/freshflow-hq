export interface WeatherData {
  isRainy: boolean;
}

interface WeatherCondition {
  main: string;
}

export async function getAdjustedSalesForecast(baseExpectedSales: number, city: string = 'Istanbul') {
  let expectedSales = baseExpectedSales;
  let message = null;
  const weather: WeatherData = { isRainy: false };

  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (apiKey) {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, { next: { revalidate: 3600 } });
      if (response.ok) {
        const data = await response.json();
        const conditions = data.weather?.map((w: WeatherCondition) => w.main.toLowerCase()) || [];
        weather.isRainy = conditions.some((c: string) => c.includes('rain') || c.includes('drizzle') || c.includes('thunderstorm'));
      }
    }
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }

  if (weather.isRainy) {
    expectedSales = expectedSales * 0.8;
    message = "Hava durumu nedeniyle %20 düşüş öngörüldü";
  }

  return {
    expectedSales,
    isRainy: weather.isRainy,
    message
  };
}
