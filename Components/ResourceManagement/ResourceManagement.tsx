'use client'

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import PureComponent from "@/components/PureComponent/PureComponent";
import { useResource } from "@/context/ResourceContext";
import './ResourceManagement.css'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const ResourceManagement: React.FC = () => {

    const { data } = useResource();

    return (
        <div className="resource-management">
            <div className="resource-chart">
                <h2 className="resource-heading">Resource Managements</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            <div className="resource-component">
                <PureComponent />
            </div>
        </div>
    );
};

export default ResourceManagement;
