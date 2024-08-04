// src/SineGraph.js
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import debounce from 'lodash.debounce';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

export default function SineGraph(sineMatch) {
    const [magnitude, setMagnitude] = useState(0.5 + 0.25*5);
    const [phase, setPhase] = useState(0 + 0.628*5);
    const [frequency, setFrequency] = useState(0 + 0.4*5);
    const start = 0;
    const end = 10;
    const increment = 0.2;
    const length = Math.floor((end - start) / increment) + 1;

    const delay = 10;
    const debouncedSetMagnitude = useCallback(debounce((value) => {
        setMagnitude(value);
    }, delay), []);
    const debouncedSetPhase = useCallback(debounce((value) => {
        setPhase(value);
    }, delay), []);
    const debouncedSetFrequency = useCallback(debounce((value) => {
        setFrequency(value);
    }, delay), []);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const staticData = useMemo(() => {
        // random integers between 0 and 10
        const randOne = getRandomInt(0, 10);
        const randTwo = getRandomInt(0, 10);
        const randThree = getRandomInt(0, 10);

        const staticMagnitude = 0.5 + 0.25*randOne
        const staticPhase = 0 + 0.628*randTwo
        const staticFrequency = 0 + 0.4*randThree

        const labels = Array.from({ length }, (_, i) => start + i * increment);
        const values = labels.map(x => staticMagnitude * Math.sin(staticFrequency*(x+staticPhase)));
        // magnitude: (0.5 --> 3, s=0.25)
        // phase: (0 --> 6.28, s=0.628)
        // frequency: (0 --> 4, s=0.4)


        return {
        labels,
        datasets: [
            {
            label: 'Static Sine Wave',
            data: values,
            borderColor: 'rgba(255, 204, 0, 0.5)',
            backgroundColor: 'rgba(255, 204, 0, 0.2)',
            pointRadius: 0,
            tension: 0.4, // Smooth curves
            },
        ],
        };
    }, []);

    // Dynamic sine wave data
    const dynamicData = useMemo(() => {
        const labels = Array.from({ length }, (_, i) => start + i * increment);
        const values = labels.map(x => magnitude * Math.sin(frequency*(x + phase)));

        return {
        labels,
        datasets: [
            {
            label: 'Dynamic Sine Wave',
            data: values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4, // Smooth curves
            pointRadius: 0,
            },
        ],
        };
    }, [magnitude, phase, frequency]);

    // Chart options
  const options = useMemo(() => ({
        plugins: {
        legend: {
            display: false, // Hide the legend
        },
        },
        scales: {
        x: {
            ticks: {
            display: false, // Hide x-axis values
            },
            grid: {
            display: false, // Hide x-axis grid lines
            },
            title: {
            display: false, // Hide x-axis title
            },
            border: {
                display: false
            },
            min: 0, // Set the minimum value of the x-axis
            max: 10, // Set the maximum value of the x-axis
        },
        y: {
            ticks: {
            display: false, // Hide y-axis values
            },
            grid: {
            display: false, // Hide y-axis grid lines
            },
            title: {
            display: false, // Hide y-axis title
            },
            border: {
                display: false
            },
            min: -3, // Set the minimum value of the y-axis
            max: 3, // Set the maximum value of the y-axis
        },
        },
    }), []);


    // Combine both datasets
    const chartData = useMemo(() => ({
        ...staticData,
        datasets: [...staticData.datasets, ...dynamicData.datasets],
    }), [staticData, dynamicData]);

    useEffect(() => {
        if (magnitude === staticData.staticMagnitude ){
            if (phase === staticData.staticPhase) {
                if (frequency === staticData.staticFrequency) {
                    sineMatch()
                }
            }
        }
    },[magnitude, phase, frequency])
    
    return (
    
        <div>
            <Line data={chartData} options={options} />
            <br/>
            <br/>
            <div>
                <label >
                <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.25"
                    value={magnitude}
                    onChange={(e) => debouncedSetMagnitude(Number(e.target.value))}
                    style={{ width: '100%' }} // Make slider full width
                />
                </label>
                <br/>
                <br/>
                <label>
                <input
                    type="range"
                    min="0"
                    max="6.28"
                    step="0.628"
                    value={phase}
                    onChange={(e) => debouncedSetPhase(Number(e.target.value))}
                    style={{ width: '100%' }} // Make slider full width
                />
                </label>
                <br/>
                <br/>
                <label>
                <input
                    type="range"
                    min="0"
                    max="4"
                    step="0.4"
                    value={frequency}
                    onChange={(e) => debouncedSetFrequency(Number(e.target.value))}
                    style={{ width: '100%' }} // Make slider full width
                />
                </label>
            </div>
        </div>
    );
};
