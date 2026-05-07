import { getAdjustedSalesForecast } from "../lib/weatherService";
import { Tooltip } from "../components/Tooltip";

export default async function Home() {
  // Example base expected sales for a product
  const baseExpectedSales = 100;
  
  // Fetch forecast data and adjust based on weather
  const { expectedSales, isRainy, message } = await getAdjustedSalesForecast(baseExpectedSales);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Live Dashboard</h1>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Forecast</h2>
          
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm text-gray-500">Expected Sales Today</p>
              <div className="text-3xl font-bold text-gray-900">
                {expectedSales}
              </div>
            </div>
            
            {isRainy && message && (
              <div className="mt-4">
                <Tooltip content={message}>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 cursor-help font-bold text-sm">
                    !
                  </div>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
