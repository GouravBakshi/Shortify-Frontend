import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const DATA_THRESHOLD = 30;

  // Function to format date into Month-Year (e.g., "Dec-2023")
  const formatDateToMonthYear = (date) => {
    const options = { year: "numeric", month: "short" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    return formattedDate; // Returns "Dec-2023"
  };

  // Group data by Month-Year and sum the counts
  const groupedByMonth = graphData.reduce((acc, { clickDate, count }) => {
    const monthYear = formatDateToMonthYear(clickDate);
    if (acc[monthYear]) {
      acc[monthYear] += count; // Add to the existing month's count
    } else {
      acc[monthYear] = count; // Create new month with the count
    }
    return acc;
  }, {});

  const monthlyLabels = Object.keys(groupedByMonth).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  const monthlyData = monthlyLabels.map((label) => groupedByMonth[label]);

  // Group data by days (for cases with fewer data points)
  const groupedByDay = graphData.reduce((acc, { clickDate, count }) => {
    const date = new Date(clickDate).toLocaleDateString("en-US"); // Format the date to YYYY-MM-DD
    if (acc[date]) {
      acc[date] += count; // Add to the existing day's count
    } else {
      acc[date] = count; // Create new day with the count
    }
    return acc;
  }, {});

  const dailyLabels = Object.keys(groupedByDay).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  const dailyData = dailyLabels.map((label) => groupedByDay[label]);

  const labels = graphData.length > DATA_THRESHOLD ? monthlyLabels : dailyLabels;
  const dataValues = graphData.length > DATA_THRESHOLD ? monthlyData : dailyData;

  const data = {
    labels: labels.length > 0 ? labels : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data: labels.length > 0 ? dataValues : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor: labels.length > 0 ? "#3b82f6" : "rgba(54, 162, 235, 0.1)",
        borderColor: "#1D2327",
        pointBorderColor: "red",
        fill: true,
        tension: 0.4,
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
            color: "#FF0000",
          },
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: labels.length > DATA_THRESHOLD ? "Month" : "Date",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
            color: "#FF0000",
          },
        },
      },
    },
  };

  return <Bar className="w-full" data={data} options={options} />;
};

export default Graph;
