import React, { useState, useEffect } from 'react';
import { SimulationConfiguration } from '../simulation/SimulationConfiguration';

interface SimulationHistoryProps {
    history: SimulationConfiguration[];
    onLoadConfiguration: (configuration: SimulationConfiguration) => void;
    onClearHistory: () => void;
}

const SimulationHistory: React.FC<SimulationHistoryProps> = ({ history, onLoadConfiguration, onClearHistory }) => {
    const [currentHistory, setCurrentHistory] = useState<SimulationConfiguration[]>(history);

    const handleClearHistoryClick = () => {
        onClearHistory();
    };

    useEffect(() => {
        setCurrentHistory(history);
    }, [history]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Simulation History</h2>
            {currentHistory.length === 0 ? (
                <p className='text-gray-700'>No saved configurations.</p>
            ) : (
                <ul className="list-disc pl-4 text-gray-700">
                    {currentHistory.map((run) => (
                        <li className='hover:cursor-pointer' key={run.id} onClick={() => onLoadConfiguration({
                            id: run.id,
                            timestamp: run.timestamp,
                            agentSpeed: run.agentSpeed,
                            population: run.population,
                            infectivityRadius: run.infectivityRadius,
                            probabilityOfInfection: run.probabilityOfInfection,
                            history: []
                        })}>
                            <p>{run.timestamp}</p>
                            <p>Agent Speed: {run.agentSpeed}</p>
                            <p>Population: {run.population}</p>
                            <p>Infectivity Radius: {run.infectivityRadius}</p>
                            <p>Probability of Infection: {run.probabilityOfInfection}</p>
                            {/* Add other configuration parameters here */}
                        </li>
                    ))}
                </ul>
            )}
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleClearHistoryClick}
            >
                Clear History
            </button>
        </div>
    );
};


export default SimulationHistory;