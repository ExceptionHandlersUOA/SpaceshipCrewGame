'use client'

import React from 'react';
import styles from './ResourceBar.module.css';
import Image from 'next/image';


export default function ProgressBar({ resource, value }: { resource: string, value: number }) {
  const resourceName = resource;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.filler} style={{width: `${value}%`}}>
          <span className={styles.label}>{`${value}`}</span>
        </div>
      </div>
      <Image
        src="/water_drops.png"
        width={50}
        height={50}
        className={styles.img}
        alt="Water Resource Icon"
      />
    </main>
    
  );
}
