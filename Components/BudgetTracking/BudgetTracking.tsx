import React from 'react';
import './Style.css';

const BudgetTracking: React.FC = () => {
  return (
    <div className="budget-tracking-container">
      <h2 className="budget-tracking-title">Budget Tracking</h2>
      <div className="budget-tracking-content">
        <div className="budget-tracking-section animate-slideInLeft">
          <h3>Total Budget</h3>
          <p>₦ 1,000,000</p>
        </div>
        <div className="budget-tracking-section animate-slideInRight">
          <h3>Spent</h3>
          <p>₦ 750,000</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracking;
