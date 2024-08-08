import React from 'react'

const ProjectOverview = () => {
    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <div className="flex justify-between">
                <div className="w-1/3">
                    <h3 className="text-lg font-semibold">Project Name</h3>
                    <p>Building A</p>
                </div>
                <div className="w-1/3">
                    <h3 className="text-lg font-semibold">Progress</h3>
                    <p>75%</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectOverview