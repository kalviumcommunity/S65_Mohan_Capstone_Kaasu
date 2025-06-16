import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'react-apexcharts';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../utils/axiosInstance';
import Loading from './Loading';

const Graph = () => {
  const location = useLocation();
  const [selectedSeries, setSelectedSeries] = useState('All');
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/transaction/all');
        const transactions = res.data.transactions;

        // Group transactions by month
        const monthlyData = {};

        transactions.forEach(tx => {
          const [day, month, year] = tx.date.split('-');
          const monthKey = `${year}-${month}`; // e.g., '2025-02'

          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { income: 0, expense: 0 };
          }

          monthlyData[monthKey].income += tx.credit || 0;
          monthlyData[monthKey].expense += tx.debit || 0;
        });

        // Sort months chronologically
        const sortedMonths = Object.keys(monthlyData).sort((a, b) => new Date(a) - new Date(b));

        const incomeData = sortedMonths.map(month => monthlyData[month].income);
        const expenseData = sortedMonths.map(month => monthlyData[month].expense);

        // Format month labels for x-axis
        const monthLabels = sortedMonths.map(month => {
          const [year, monthNum] = month.split('-');
          const date = new Date(year, monthNum - 1);
          return date.toLocaleString('default', { month: 'short', year: 'numeric' });
        });

        const chartOptions = {
          chart: { height: 300, type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth', width: 2 },
          grid: { strokeDashArray: 2, borderColor: '#e5e7eb' },
          fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0, stops: [50, 100] } },
          xaxis: {
            type: 'category',
            categories: monthLabels,
            labels: { style: { colors: '#9ca3af', fontSize: '13px', fontFamily: 'Inter, ui-sans-serif', fontWeight: 400 } }
          },
          yaxis: {
            labels: { align: 'left', style: { colors: '#9ca3af', fontSize: '13px' }, formatter: val => val >= 1000 ? `${val/1000}k` : val }
          },
          tooltip: {
            shared: true,
            intersect: false,
            x: { formatter: val => `<strong>${val}</strong>` },
            y: { formatter: val => `<span style='font-weight:bold;'>₹${val.toLocaleString()}</span>` },
            style: { fontFamily: 'Inter, ui-sans-serif' }
          },
          responsive: [{ breakpoint: 568, options: { chart: { height: 300 }, xaxis: { labels: { style: { fontSize: '11px' }, formatter: val => val } }, yaxis: { labels: { style: { fontSize: '11px' } } } } }]
        };

        setOptions(chartOptions);
        setSeries([
          { name: 'Income', data: incomeData },
          { name: 'Expense', data: expenseData }
        ]);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.pathname]);

  if (loading) {
    return <Loading />;
  }

  const filteredSeries = series.filter(s => selectedSeries === 'All' || s.name === selectedSeries);

  return (
    <div className="p-5 border m-5">
      <div className="flex justify-center sm:justify-end items-center gap-x-4 mb-4">
        {['All', 'Income', 'Expense'].map(name => (
          <button
            key={name}
            onClick={() => setSelectedSeries(name)}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              selectedSeries === name
                ? name === 'Income'
                  ? 'bg-blue-600 text-white'
                  : name === 'Expense'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >{name}</button>
        ))}
      </div>
      <Chart options={options} series={filteredSeries} type="area" height={300} />
    </div>
  );
};

export default Graph;
