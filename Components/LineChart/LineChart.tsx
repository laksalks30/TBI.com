import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
    chartData: { name: string; value: number; amount: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ chartData }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const data = {
        labels: chartData.map((data) => data.name),
        datasets: [
            {
                label: 'Value',
                data: chartData.map((data) => data.value),
                borderColor: '#8884d8',
                fill: false,
            },
            {
                label: 'Amount',
                data: chartData.map((data) => data.amount),
                borderColor: '#82ca9d',
                fill: false,
            },
        ],
    };

    return (
        <Line
            data={data}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: 'Budget Tracking Over Years',
                    },
                    legend: {
                        display: true,
                    },
                },
            }}
        />
    );
};

export default LineChart;
