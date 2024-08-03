'use client'

import React from 'react';
import styles from './ResourceBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faDroplet, faGasPump } from '@fortawesome/free-solid-svg-icons'


export enum Resources {
  Water,
  Fuel,
  Electricity
}


export default function ProgressBar({ resource, value }: { resource: Resources, value: number }) {
  const getGradient = () => {
    switch(resource) {
      case Resources.Water:
        return {backgroundImage: 'linear-gradient(to right, lightblue, darkblue)'}
      case Resources.Fuel:
        return {backgroundImage: 'linear-gradient(to right, yellow, orange, red, brown)'}
      case Resources.Electricity:
        return {backgroundImage: 'linear-gradient(to right, lightyellow, yellow, gold, darkgoldenrod)'}
    }
  };

  const getIcon = () => {
    switch(resource) {
      case Resources.Water:
        return <FontAwesomeIcon className={styles.icon} icon={faDroplet} style={{color: "#1a79c1",}} />
      case Resources.Fuel:
        return <FontAwesomeIcon className={styles.icon} icon={faGasPump} style={{color: "#131416",}} />
      case Resources.Electricity:
        return <FontAwesomeIcon className={styles.icon} icon={faBolt} style={{color: "#FFD43B",}} />
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.filler} style={{...getGradient(), width: `${value}%`}}>
          <span className={styles.label}>{`${value}`}</span>
        </div>
      </div>
      {getIcon()}
    </main>
    
  );
}
