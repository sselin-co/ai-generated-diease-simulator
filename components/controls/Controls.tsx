// Import the useState hook.
import React, { useState } from 'react';

// Add the agentSpeed prop type to the ControlsProps interface.
interface ControlsProps {
    agentSpeed: number;
    setAgentSpeed: (value: number) => void;
    population: number;
    setPopulation: (value: number) => void;
    infectivityRadius: number;
    setInfectivityRadius: (value: number) => void;
    probabilityOfInfection: number;
    setProbabilityOfInfection: (value: number) => void;
    onSave: () => void;
}

const Controls: React.FC<ControlsProps> = ({
    agentSpeed,
    setAgentSpeed,
    population,
    setPopulation,
    infectivityRadius,
    setInfectivityRadius,
    probabilityOfInfection,
    setProbabilityOfInfection,
    onSave
}) => {
    // Render the control panel components.
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
                <label htmlFor="agentSpeed" className="block text-sm font-medium text-gray-700">
                    Agent Speed
                </label>
                <input
                    type="range"
                    id="agentSpeed"
                    name="agentSpeed"
                    min="0.01"
                    max="0.5"
                    step="0.01"
                    value={agentSpeed}
                    onChange={(e) => setAgentSpeed(parseFloat(e.target.value))}
                    className="mt-1 w-full h-2 rounded-full bg-blue-300 outline-none appearance-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="population" className="block text-sm font-medium text-gray-700">
                    Population
                </label>
                <input
                    type="range"
                    id="population"
                    name="population"
                    min="10"
                    max="500"
                    step="1"
                    value={population}
                    onChange={(e) => setPopulation(parseFloat(e.target.value))}
                    className="mt-1 w-full h-2 rounded-full bg-blue-300 outline-none appearance-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="infectivityRadius" className="block text-sm font-medium text-gray-700">
                    Infectivity Radius
                </label>
                <input
                    type="range"
                    id="infectivityRadius"
                    name="infectivityRadius"
                    min="0.1"
                    max="2"
                    step="0.01"
                    value={infectivityRadius}
                    onChange={(e) => setInfectivityRadius(parseFloat(e.target.value))}
                    className="mt-1 w-full h-2 rounded-full bg-blue-300 outline-none appearance-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="infectivityRadius" className="block text-sm font-medium text-gray-700">
                    Probability of infection
                </label>
                <input
                    type="range"
                    id="probabilityOfInfection"
                    name="probabilityOfInfection"
                    min="0.1"
                    max="1"
                    step="0.01"
                    value={probabilityOfInfection}
                    onChange={(e) => setProbabilityOfInfection(parseFloat(e.target.value))}
                    className="mt-1 w-full h-2 rounded-full bg-blue-300 outline-none appearance-none"
                />
            </div>
            <button
                onClick={onSave}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
            >
                Save Configuration
            </button>
        </div>
    );
};

export default Controls