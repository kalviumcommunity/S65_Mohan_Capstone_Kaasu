import Reactfrom "react";
import Navbar from "./Navbar";
import Chart from "react-apexcharts";
import { Filter } from "lucide-react";
import RecentTransactions from "./RecentTransactions";

const FinancialChart = () => {

  const options = {
    chart: {
      type: 'area',
      height: 280,
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, sans-serif',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          fontSize: '12px',
          padding: 10
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value.toLocaleString();
        },
        style: {
          fontSize: '12px'
        }
      }
    },
    grid: {
      borderColor: '#f8f8f8',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      x: {
        format: 'MMM'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '11px'
    },
    colors: ['#4f46e5', '#10b981']
  };

  const series = [
    {
      name: 'Income',
      data: [6500, 7800, 7200, 8100, 7500, 9000, 8800, 9200, 8500]
    },
    {
      name: 'Expenses',
      data: [3200, 3900, 3300, 3800, 3600, 4200, 4500, 4300, 4100]
    }
  ];

  return (
    <div className=" px-6">
      <div className="mt-10 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6 border border-1-gray-300">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">Financial Overview</h3>
              <p className="text-sm text-gray-500">Income vs. Expenses</p>
            </div>
            <div className="flex items-center">
              <button className="flex items-center text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1 mr-2">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </button>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white">
                <option>Last 9 Months</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
              </select>
            </div>
          </div>
          <Chart options={options} series={series} type="area" height={280} />
        </div>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default FinancialChart;