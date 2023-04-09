import * as THREE from 'three';

export enum AgentState {
  Susceptible,
  Infected,
  Recovered,
}

// The Agent class represents an individual in the simulation.
export class Agent {
  public state: AgentState;
  public mesh: THREE.Mesh;
  public timeInfected: number | null;
  velocity: THREE.Vector3

  constructor(state: AgentState, mesh: THREE.Mesh) {
    this.state = state;
    this.mesh = mesh;
    this.timeInfected = null;

    // Initialize the velocity vector with random values
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
  }
}