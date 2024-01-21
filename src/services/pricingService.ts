import { Pricing } from '../types';

export const fetchPricing = async (): Promise<Pricing> => {
  const response = await fetch('/pricing_data.json');
  const data: Pricing = await response.json();
  return data;
};
