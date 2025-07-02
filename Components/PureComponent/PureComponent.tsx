import React, { useState } from 'react';
import LineChart from '@/components/LineChart/LineChart';

interface chartDataProps {
  name: string;
  value: number;
  amount: number;
}

const PureComponent: React.FC = () => {
  const [chartData, setChartData] = useState<chartDataProps[]>([
    { name: 'January', value: 200, amount: 80000 },
    { name: 'February', value: 14000, amount: 141000 },
    { name: 'March', value: 25000, amount: 129000 },
    { name: 'April', value: 3300, amount: 20000 },
    { name: 'May', value: 3189, amount: 20181 },
    { name: 'June', value: 2239, amount: 250000 },
    { name: 'July', value: 2149, amount: 2700 },
    { name: 'August', value: 1360, amount: 3170 },
    { name: 'September', value: 40, amount: 5600 },
    { name: 'October', value: 62, amount: 90000 },
    { name: 'November', value: 49, amount: 81000 },
    { name: 'December', value: 249, amount: 177349 },
  ]);

  return (
    <div className="pure-component">
      <h2 className="heading">Budget Tracking Over Years</h2>
      <LineChart chartData={chartData} />
    </div>
  );
};

export default PureComponent;
