import React, { useState } from 'react';
import Layout from '../components/Layout';
import Simulation from '../components/simulation/Simulation';
import Controls from '../components/controls/Controls';
import SimulationHistory from '@/components/history/SimulationHistory';
import { SimulationConfiguration } from '@/components/simulation/SimulationConfiguration';

type SimulationConfig = {
  population: number;
  infectivityRadius: number;
  probabilityOfInfection: number;
  agentSpeed: number;
};

const DEFAULT_CONFIG: SimulationConfig = {
  population: 50,
  infectivityRadius: 1,
  probabilityOfInfection: 0.8,
  agentSpeed: 0.1,
};

const Home: React.FC = () => {
  // State for agentSpeed control.
  const [agentSpeed, setAgentSpeed] = useState(DEFAULT_CONFIG.agentSpeed);
  const [population, setPopulation] = useState(DEFAULT_CONFIG.population);
  const [infectivityRadius, setInfectivityRadius] = useState(DEFAULT_CONFIG.infectivityRadius);
  const [probabilityOfInfection, setProbabilityOfInfection] = useState(DEFAULT_CONFIG.probabilityOfInfection);
  // Add a state to store the simulation history.
  const [simulationHistory, setSimulationHistory] = useState<SimulationConfiguration[]>([]);

  const handleSaveConfiguration = () => {
    const configuration: SimulationConfiguration = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      agentSpeed,
      population,
      infectivityRadius,
      probabilityOfInfection,
      history: simulationHistory,
    };

    setSimulationHistory([...simulationHistory, configuration]);
  };


  const handleLoadConfiguration = (configuration: SimulationConfiguration) => {
    setAgentSpeed(configuration.agentSpeed);
    setPopulation(configuration.population)
    setInfectivityRadius(configuration.infectivityRadius)
    setProbabilityOfInfection(configuration.probabilityOfInfection)
    // Load other configuration parameters here

    setSimulationHistory([...simulationHistory])
  };

  const handleClearHistory = () => {
    setSimulationHistory([]);
  };

  // Add additional states for other controls as needed.

  return (
    <Layout>
      <Simulation
        agentSpeed={agentSpeed}
        population={population}
        infectivityRadius={infectivityRadius}
        probabilityOfInfection={probabilityOfInfection}
      />
      <Controls
        agentSpeed={agentSpeed}
        setAgentSpeed={setAgentSpeed}
        population={population}
        setPopulation={setPopulation}
        infectivityRadius={infectivityRadius}
        setInfectivityRadius={setInfectivityRadius}
        probabilityOfInfection={probabilityOfInfection}
        setProbabilityOfInfection={setProbabilityOfInfection}
        onSave={handleSaveConfiguration}
      />
      <div className="col-span-1" style={{ minHeight: '10rem' }}>
        <SimulationHistory
          history={simulationHistory}
          onLoadConfiguration={handleLoadConfiguration}
          onClearHistory={handleClearHistory}
        />
      </div>

    </Layout>
  );
};

export default Home;
