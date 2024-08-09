import React, { useState } from 'react';
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LineChart from '@/Components/LineChart/LineChart';


// const data = [
//     { name: 'January', value: 200, amount: 80000 },
//     { name: 'February', value: 14000, amount: 141000 },
//     { name: 'March', value: 25000, amount: 129000 },
//     { name: 'April', value: 3300, amount: 20000 },
//     { name: 'May', value: 3189, amount: 20181 },
//     { name: 'June', value: 2239, amount: 250000 },
//     { name: 'July', value: 2149, amount: 2700 },
//     { name: 'August', value: 1360, amount: 3170 },
//     { name: 'September', value: 40, amount: 5600 },
//     { name: 'October', value: 62, amount: 90000 },
//     { name: 'November', value: 49, amount: 81000 },
//     { name: 'December', value: 249, amount: 177349 },
// ];
interface chartDataProps {
      name: string;
      value: number;
      amount: number;
}

const PureComponent: React.FC = () => {
    const [chartData, setChartData] = useState<chartDataProps[]>( [

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

    ])

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Budget Tracking Over Years</h2>
            <LineChart chartData={chartData} />
        </div>
    );
};

export default PureComponent;
