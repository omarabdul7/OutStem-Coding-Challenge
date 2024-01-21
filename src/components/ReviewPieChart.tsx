import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Review } from '../types';
import { fetchReviews } from '../services/reviewService';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ReviewPieChartProps {
  startDate: string;
  endDate: string;
}

const ReviewPieChart: React.FC<ReviewPieChartProps> = ({ startDate, endDate }) => {
  const [reviewData, setReviewData] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews().then(data => {
      const filteredData = data.filter(review => {
        const reviewDate = new Date(review.date);
        return reviewDate >= new Date(startDate) && reviewDate <= new Date(endDate);
      });

      setReviewData(filteredData);
    });
  }, [startDate, endDate]);

  const sentimentCounts = reviewData.reduce((acc, review) => {
    acc[review.sentiment] = (acc[review.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(sentimentCounts),
    datasets: [
      {
        data: Object.values(sentimentCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ]
      }
    ]
  };

  return <Pie data={data} />;
};

export default ReviewPieChart;
