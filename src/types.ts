// src/types.ts

export interface Review {
    review_id: number;
    sentiment: string;
    store: string;
    date: string;
    message: string;
  }
  // src/types.ts

export interface OrderItem {
    type: string;
    size: string;
  }
  
export interface Order {
    order_id: number;
    store: string;
    items: OrderItem[];
    date: string;
  }

export interface Pricing {
    [key: string]: { [key: string]: number }; // key: Pizza type, value: { size: price }
  }