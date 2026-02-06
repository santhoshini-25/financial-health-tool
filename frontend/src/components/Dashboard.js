import React from 'react';
import { Bar } from 'react-chartjs-2';  // For charts
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard({ insights, data }) {
  // Sample chart data (replace with real data from backend)
  const chartData = {
    labels: ['Revenue', 'Expenses', 'Profit'],
    datasets: [{
      label: 'Financial Metrics',
      data: [data.revenue || 0, data.expenses || 0, (data.revenue - data.expenses) || 0],
      backgroundColor: ['rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    }],
  };

  return (
    <div>
      <h2>Financial Insights</h2>
      <p>{insights || 'Upload data to see AI insights here.'}</p>
      <Bar data={chartData} />  {/* Simple bar chart */}
    </div>
  );
}

export default Dashboard;