// src/SineGraph.js
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import debounce from 'lodash.debounce';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

export default function SineGraph(sineMatch) {
    const magChange = 0.25;
    const phaseChange = 0.628;
    const freqChange = 0.4;

    const tension = 0.4;

    const defaultTolerance = 2;

    const start = 0;
    const end = 10;
    const range = end - start;
    const increment = 0.2;

    const delay = 10;
    const amount = 5;

    const [magnitude, setMagnitude] = useState(magChange * amount);
    const [phase, setPhase] = useState(phaseChange * amount);
    const [frequency, setFrequency] = useState(freqChange * amount);

    const length = Math.floor(range / increment) + 1;

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
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    }

    const staticData = useMemo(() => {
        const staticMagnitude = magChange * getRandomInt(start + 1, end - 1)
        const staticPhase = phaseChange * getRandomInt(start + 1, end - 1)
        const staticFrequency = freqChange * getRandomInt(start + 1, end - 1)

        const labels = Array.from({ length }, (_, i) => start + i * increment);
        const values = labels.map(x => staticMagnitude * Math.sin(staticFrequency * (x + staticPhase)));

        return {
            labels,
            datasets: [
                {
                label: 'Static Sine Wave',
                data: values,
                borderColor: 'rgba(255, 204, 0, 0.5)',
                backgroundColor: 'rgba(255, 204, 0, 0.2)',
                pointRadius: 0,
                tension: tension, // Smooth curves
                },
            ],
        };
    }, []);

    // Dynamic sine wave data
    const dynamicData = useMemo(() => {
        const labels = Array.from({ length }, (_, i) => start + i * increment);
        const values = labels.map(x => magnitude * Math.sin(frequency * (x + phase)));

        return {
            labels,
            datasets: [
                {
                label: 'Dynamic Sine Wave',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: tension, // Smooth curves
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
                min: start, // Set the minimum value of the x-axis
                max: end, // Set the maximum value of the x-axis
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
        console.log("User has moved the bars!");

        console.log("magnitude: " + magnitude + " vs " + staticData.magnitude);
        console.log("phase: " + phase + " vs " + staticData.phase);
        console.log("frequency: " + frequency + " vs " + staticData.frequency);

        const magnitudeTolerance = magChange * defaultTolerance;
        const phaseTolerance = phaseChange * defaultTolerance;
        const frequencyTolerance = freqChange * defaultTolerance;
        
        const magnitudeDiff = Math.abs(magnitude - staticData.magnitude);
        const phaseDiff = Math.abs(phase - staticData.phase);
        const frequencyDiff = Math.abs(frequency - staticData.frequency);      

        const magnitudeMatch = magnitudeDiff <= magnitudeTolerance;
        const phaseMatch = phaseDiff <= phaseTolerance;
        const frequencyMatch = frequencyDiff <= frequencyTolerance;      
        
        if (magnitudeMatch && phaseMatch && frequencyMatch) {
            console.log("User has matched sine curves!");
            sineMatch();
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
                        min={start * start}
                        max={magChange * end}
                        step={magChange}
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
                        min={phaseChange * start}
                        max={phaseChange * end}
                        step={phaseChange}
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
                        min={freqChange * start}
                        max={freqChange * end}
                        step={freqChange}
                        value={frequency}
                        onChange={(e) => debouncedSetFrequency(Number(e.target.value))}
                        style={{ width: '100%' }} // Make slider full width
                    />
                </label>
            </div>
        </div>
    );
};
