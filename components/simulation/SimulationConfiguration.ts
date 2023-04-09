export interface SimulationConfiguration {
    id: number;
    timestamp: string;
    agentSpeed: number;
    population: number;
    infectivityRadius: number,
    probabilityOfInfection: number,
    // Add other configuration parameters here
    history: SimulationConfiguration[];
  }
  