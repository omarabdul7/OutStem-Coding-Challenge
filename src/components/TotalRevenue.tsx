import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../services/orderService';
import { fetchPricing } from '../services/pricingService';

const TotalRevenue = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    const calculateTotalRevenue = async () => {
      const orders = await fetchOrders();
      const pricing = await fetchPricing();
      
      const total = orders.reduce((acc, order) => {
        const orderTotal = order.items.reduce((orderAcc, item) => {
          const price = pricing[item.type][item.size];
          return orderAcc + price;
        }, 0);
        return acc + orderTotal;
      }, 0);

      setTotalRevenue(total);
    };

    calculateTotalRevenue();
  }, []);

  return (
    <div>
      <p>${totalRevenue.toFixed(2)}</p>
    </div>
  );
};

export default TotalRevenue;
