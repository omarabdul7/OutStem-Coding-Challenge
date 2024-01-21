import { Order } from '../types';

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch('/order_data.json');
  const data: Order[] = await response.json();
  return data;
};
