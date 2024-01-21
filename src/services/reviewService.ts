import { Review } from '../types';

export const fetchReviews = async (): Promise<Review[]> => {
  const response = await fetch('/review_data.json');
  const data: Review[] = await response.json();
  return data;
};
