# SIR Disease Simulator SPA

This is a Single Page Application built with Next.js that simulates the spread of a disease using the SIR model. The application uses Tailwind CSS for the UI and three.js to create the simulation visual.

## Implementation Details

The simulation uses the SIR (Susceptible-Infected-Recovered) model to simulate the spread of the disease. The simulation takes place in a closed environment with a set population of agents, each agent can be one of these three states. An S agent can be converted to the I state by coming into contact with another agent with I status. There is a probability each time an S agent is in a certain radius of an I agent if it will get infected. Once an I agent has spent a certain amount of time in this state, it transitions to R state where it cannot be moved to I state again.

The UI is built using Tailwind CSS, and the simulation visual is created using three.js. The application allows you to control parameters such as infectivity radius, speed of agent movement, probability of infection, and size of the population. You can save run configurations and store a history of previous runs of the simulation. Additionally, a graph is displayed showing the relationship between agents in different SIR states.

## Acknowledgements

This project was primarily created by GPT-4. In fact, this README is written by GPT-4.
