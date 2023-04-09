import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Agent, AgentState } from './Agent';

interface SimulationProps {
    agentSpeed: number;
    population: number;
    infectivityRadius: number;
    probabilityOfInfection: number;
}

const infectedMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const recoveredMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const susceptibleMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const boundingBoxSize = new THREE.Vector3(20, 20, 20);
const cubeSegments = 1;
const glassOpacity = 0.3;
const glassReflectivity = 0.8;
const glassTransmission = 0.9;


const Simulation: React.FC<SimulationProps> = ({
    agentSpeed,
    population,
    infectivityRadius,
    probabilityOfInfection,
}) => {
    const simulationContainerRef = useRef<HTMLDivElement | null>(null);
    const agents = useRef<Agent[]>([]);
    const sceneRef = useRef(new THREE.Scene());

    // Initial setup of the renderer
    useEffect(() => {
        if (!simulationContainerRef.current) return;

        const scene = sceneRef.current;

        // 1. Change the background color to a darker color
        scene.background = new THREE.Color(0x222222);

        const camera = new THREE.PerspectiveCamera(
            75,
            simulationContainerRef.current.clientWidth / simulationContainerRef.current.clientHeight,
            0.1,
            1000
        );

        if (simulationContainerRef.current.children.length > 0) return;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(simulationContainerRef.current.clientWidth, simulationContainerRef.current.clientHeight);
        simulationContainerRef.current.appendChild(renderer.domElement);

        camera.position.z = 15; // Increase the camera distance to see more agents

        // Add an ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add a point light
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const boundingBox = createBoundingBox(boundingBoxSize);
        scene.add(boundingBox);

        // 3. Add subtle camera movement
        const cameraSpeed = 0.0005;
        const cameraRadius = 20;
        let cameraTheta = 0;

        const animate = () => {
            requestAnimationFrame(animate);

            // Update the camera position
            cameraTheta += cameraSpeed;
            camera.position.x = cameraRadius * Math.sin(cameraTheta);
            camera.position.z = cameraRadius * Math.cos(cameraTheta);
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
            agents.current.forEach((agent) => {
                agent.mesh.geometry.dispose();
                if (agent.mesh.material instanceof THREE.MeshStandardMaterial) {
                    agent.mesh.material.dispose();
                }
            });
        };
    }, [agentSpeed, infectivityRadius, probabilityOfInfection]);



    // Updating the agents based on the parameters
    useEffect(() => {
        const scene = sceneRef.current;
        const newAgents = createAgents(population, infectivityRadius, scene);

        // Remove old agents from the scene
        agents.current.forEach((agent) => {
            scene.remove(agent.mesh);
        });

        agents.current = newAgents;

        // Add new agents to the scene
        agents.current.forEach((agent) => {
            scene.add(agent.mesh);
        });

    }, [agentSpeed, population, infectivityRadius, probabilityOfInfection]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateAgents(agentSpeed, infectivityRadius, probabilityOfInfection, agents.current);
        }, 1000 / 60); // Call the update function 60 times per second

        return () => {
            clearInterval(interval);
        };
    }, [agentSpeed, infectivityRadius, probabilityOfInfection]);

    return <div ref={simulationContainerRef} className="w-full h-96 relative"></div>;
};

function createAgents(population: number, infectivityRadius: number, scene: THREE.Scene): Agent[] {
    const initialInfected = 1;
    const agentCount = population;

    const agents: Agent[] = [];
    const agentGeometry = new THREE.SphereGeometry(0.5); // Change the radius here

    for (let i = 0; i < agentCount; i++) {
        const state = i < initialInfected ? AgentState.Infected : AgentState.Susceptible;
        const material = state === AgentState.Infected ? infectedMaterial : susceptibleMaterial;
        const mesh = new THREE.Mesh(agentGeometry, material);

        mesh.position.set(
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5
        );

        scene.add(mesh);

        agents.push(new Agent(state, mesh));
    }

    return agents;
}


function updateAgents(
    agentSpeed: number,
    infectivityRadius: number,
    probabilityOfInfection: number,
    agents: Agent[]
): void {
    const recoveryTimeMin = 1800;
    const recoveryTimeMax = 2400;
    const incubationPeriod = 30;

    agents.forEach((agent, i) => {
        agent.mesh.position.add(agent.velocity.clone().multiplyScalar(agentSpeed));

        for (let j = 0; j < 3; j++) {
            if (
                agent.mesh.position.getComponent(j) < -boundingBoxSize.getComponent(j) / 2 ||
                agent.mesh.position.getComponent(j) > boundingBoxSize.getComponent(j) / 2
            ) {
                agent.velocity.setComponent(j, -agent.velocity.getComponent(j));
            }
        }

        if (agent.state === AgentState.Infected) {
            agent.timeInfected = (agent.timeInfected || 0) + 1;

            const recoveryTime = recoveryTimeMin + Math.random() * (recoveryTimeMax - recoveryTimeMin);

            if (agent.timeInfected > recoveryTime) {
                agent.state = AgentState.Recovered;
                agent.mesh.material = recoveredMaterial;
            }
        }

        agents.slice(i + 1).forEach((otherAgent) => {
            const distance = agent.mesh.position.distanceTo(otherAgent.mesh.position);

            if (distance < infectivityRadius) {
                const infectionChance = probabilityOfInfection * (1 - distance / infectivityRadius);

                if (agent.state === AgentState.Infected && otherAgent.state === AgentState.Susceptible) {
                    if (infectionChance > Math.random()) {
                        if (agent.timeInfected !== null && agent.timeInfected > incubationPeriod) {
                            otherAgent.state = AgentState.Infected;
                            otherAgent.timeInfected = 0;
                            otherAgent.mesh.material = infectedMaterial;
                        }
                    }
                } else if (agent.state === AgentState.Susceptible && otherAgent.state === AgentState.Infected) {
                    if (infectionChance > Math.random()) {
                        if (otherAgent.timeInfected !== null && otherAgent.timeInfected > incubationPeriod) {
                            agent.state = AgentState.Infected;
                            agent.timeInfected = 0;
                            agent.mesh.material = infectedMaterial;
                        }
                    }
                }
            }
        });
    });
}

function createBoundingBox(size: THREE.Vector3): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    return new THREE.Mesh(geometry, material);
}

export default Simulation;

