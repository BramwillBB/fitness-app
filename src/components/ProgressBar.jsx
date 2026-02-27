// src/components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ current, total, label }) => {
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

    return (
        <div className="progress-container">
            <div className="progress-header">
                <span>{label}</span>
                <span>{percentage}% ({current}/{total})</span>
            </div>
            <div className="progress-bar-bg" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
