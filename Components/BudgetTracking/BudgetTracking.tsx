import React from 'react';

const BudgetTracking: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Budget Tracking</h2>
      <div className="flex justify-between">
        <div className="w-1/3">
          <h3 className="text-lg font-semibold animate-slideInLeft">Total Budget</h3>
          <p className='animate-slideInLeft'>₦ 1, 000,000</p>
        </div>
        <div className="w-1/3 animate-slideInRight">
          <h3 className="text-lg font-semibold animate-slideInRight">Spent</h3>
          <p>₦ 750,000</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracking;
