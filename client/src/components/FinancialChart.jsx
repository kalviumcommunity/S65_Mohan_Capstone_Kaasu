import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Chart from "react-apexcharts";
import { Filter } from "lucide-react";
import RecentTransactions from "./RecentTransactions";
import useTransactionStore from "../stores/useTransactionsStore";

const FinancialChart = ({currentView}) => {

  const { transactions, getTransactions } = useTransactionStore();
  
  useEffect(() => {
    getTransactions();
  }, [getTransactions, currentView]);
  
  const getExpense = () => {
    let expenses = [0,0,0,0,0,0,0,0,0,0,0,0]
    if (transactions) transactions.forEach(el => {
      
      if (el.debit){
        let month = Number(el.date.split('-')[1])
        expenses[month-1] += el.debit
      }
    })
    return expenses
  }
  const getIncome = () => {
    let income = [0,0,0,0,0,0,0,0,0,0,0,0]
    if (transactions) transactions.forEach(el => {
      
      if (el.credit){
        let month = Number(el.date.split('-')[1])
        income[month-1] += el.credit
      }
    })
    return income
  }



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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
      data: getIncome()
    },
    {
      name: 'Expenses',
      data: getExpense()
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
            {/* <div className="flex items-center">
              <button className="flex items-center text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1 mr-2">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </button>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white">
                <option>Last 9 Months</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
              </select>
            </div> */}
          </div>
          <Chart options={options} series={series} type="area" height={280} />
        </div>
        <RecentTransactions  transactions={transactions}/>
      </div>
    </div>
  );
};

export default FinancialChart;