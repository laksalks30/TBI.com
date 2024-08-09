import React from 'react';
import './ProjectOverview.css';

const ProjectOverview = () => {
    return (
        <div className="project-overview">
            <h2 className="project-title">Project Overview</h2>
            <div className="project-details">
                <div className="project-info">
                    <h3 className="project-subtitle animate-slideInUp">Project Name</h3>
                    <p className="animate-slideInLeft">Building A</p>
                </div>
                <div className="project-info">
                    <h3 className="project-subtitle animate-slideInUp">Progress</h3>
                    <p className="animate-slideInRight">75%</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectOverview;
