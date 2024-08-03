'use client'

import React from 'react';
import styles from './ResourceBar.module.css';
import Image from 'next/image';

export enum Resources {
  Water = "water",
  Fuel = "fuel",
  Electricity = "electricity"
}


export default function ProgressBar({ resource, value }: { resource: Resources, value: number }) {
  console.log(resource)
  
  const getGradient = () => {
    switch(resource) {
      case Resources.Water:
        return {backgroundImage: 'linear-gradient(to right, lightblue, darkblue)'}
      case Resources.Fuel:
        return {backgroundImage: 'linear-gradient(to right, lightyellow, yellow, orange, red, brown)'}
      case Resources.Electricity:
        return {backgroundImage: 'linear-gradient(to right, lightyellow, yellow, gold, darkgoldenrod)'}
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.filler} style={{...getGradient(), width: `${value}%`}}>
          <span className={styles.label}>{`${value}`}</span>
        </div>
      </div>
      {/* <Image
        src={} // Change icon src
        width={50}
        height={50}
        className={styles.img}
        alt="Water Resource Icon"
      /> */}
    </main>
    
  );
}
