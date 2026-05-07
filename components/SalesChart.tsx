"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function SalesChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        // DİKKAT: Predictions sayfasında özel HTML lejant yaptığımız için 
        // Chart.js'in dahili lejantını burada tamamen gizliyoruz.
        display: false, 
      },
      tooltip: {
        backgroundColor: '#10221b',
        titleFont: { family: "'Space Grotesk', sans-serif" },
        bodyFont: { family: "'Space Grotesk', sans-serif" },
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Space Grotesk', sans-serif"
          },
          color: '#3A6F43'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: 'rgba(58, 111, 67, 0.05)',
          borderDash: [5, 5]
        },
        ticks: {
          font: { family: "'Space Grotesk', sans-serif" },
          color: '#3A6F43'
        },
        title: {
          display: true,
          text: 'Orders',
          color: '#3A6F43',
          font: { size: 10 }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          display: false
        }
      }
    }
  };

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales Volume (Orders)',
        data: [120, 115, 80, 85, 140, 160, 130],
        borderColor: '#59AC77',
        // 'any' tipi kaldırılarak strict type güvenliği sağlandı
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          
          if (!chartArea) {
            return 'transparent';
          }
          
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(89, 172, 119, 0)');
          gradient.addColorStop(1, 'rgba(89, 172, 119, 0.2)');
          return gradient;
        },
        tension: 0.4,
        borderWidth: 3,
        fill: true,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#59AC77',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y'
      },
      {
        label: 'Rainfall (mm)',
        data: [5, 10, 45, 40, 5, 0, 10],
        borderColor: '#3A6F43',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        yAxisID: 'y1'
      }
    ]
  };

  return <Line options={options} data={data} />;
}