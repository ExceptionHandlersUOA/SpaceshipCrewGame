'use client'

import React from 'react';
import styles from './ResourceBar.module.css';

const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className={styles.container}>
      <div className={styles.filler} style={{width: `${value}%`}}>
        <span className={styles.label}>{`${value}`}</span>
      </div>
    </div>
  );
};



export default ProgressBar;
