import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Order } from "../types";
import { fetchOrders } from "../services/orderService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Filter {
  type: string | null;
  size: string | null;
}

interface OrderBarChartProps {
  startDate: string;
  endDate: string;
}

const OrderBarChart: React.FC<OrderBarChartProps> = ({
  startDate,
  endDate,
}) => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Filter>({ type: null, size: null });

  useEffect(() => {
    fetchOrders().then((data) => {
      const filteredData = data.filter((order) => {
        const orderDate = new Date(order.date);
        return (
          orderDate >= new Date(startDate) && orderDate <= new Date(endDate)
        );
      });
      setOrderData(filteredData);
    });
  }, [startDate, endDate]);

  const filteredOrders = orderData.filter((order) => {
    return (
      (!filter.type || order.items.some((item) => item.type === filter.type)) &&
      (!filter.size || order.items.some((item) => item.size === filter.size))
    );
  });

  const storeOrderCounts = filteredOrders.reduce((acc, order) => {
    acc[order.store] = (acc[order.store] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(storeOrderCounts),
    datasets: [
      {
        label: "Number of Orders",
        data: Object.values(storeOrderCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div>
        <label>
          Pizza Type:
          <select
            className="dropdown-select"
            onChange={(e) =>
              setFilter({ ...filter, type: e.target.value || null })
            }
          >
            <option value="">All</option>
            <option value="Cheese">Cheese</option>
            <option value="Pepperoni">Pepperoni</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Hawaiian">Hawaiian</option>
            <option value="Meatlovers">Meatlovers</option>
          </select>
        </label>
        <label>
          Pizza Size:
          <select
            className="dropdown-select"
            onChange={(e) =>
              setFilter({ ...filter, size: e.target.value || null })
            }
          >
            <option value="">All</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </label>
      </div>
      <Bar data={data} />
    </div>
  );
};

export default OrderBarChart;
