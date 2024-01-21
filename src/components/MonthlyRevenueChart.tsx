import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { fetchOrders } from '../services/orderService';
import { fetchPricing } from '../services/pricingService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface MonthlyRevenueChartProps {
  startDate: string;
  endDate: string;
}

const MonthlyRevenueChart: React.FC<MonthlyRevenueChartProps> = ({ startDate, endDate }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>(new Array(12).fill(0));

  useEffect(() => {
    const calculateMonthlyRevenue = async () => {
      const orders = await fetchOrders();
      const pricing = await fetchPricing();

      const monthlyTotals = new Array(12).fill(0);

      orders.forEach(order => {
        const orderDate = new Date(order.date);
        if (orderDate >= new Date(startDate) && orderDate <= new Date(endDate)) {
          const month = orderDate.getMonth(); 
          const orderTotal = order.items.reduce((acc, item) => {
            const price = pricing[item.type][item.size];
            return acc + price;
          }, 0);

          monthlyTotals[month] += orderTotal;
        }
      });

      setMonthlyRevenue(monthlyTotals);
    };

    calculateMonthlyRevenue();
  }, [startDate, endDate]);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Revenue in 2023 ($)',
        data: monthlyRevenue,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      }
    ],
  };

  return <Line data={data} />;
};

export default MonthlyRevenueChart;
