import React from 'react';
import styles from "./DirectionBar.module.css"

export default function ThreeSectionBar({ redSection }: { redSection: number }) {
  const getSectionStyle = (sectionIndex: number) => ({
    
  });

  return (
    <div className={styles.container}>
      <div className={styles.section} style={{backgroundColor:  redSection === 0 ? 'red' : 'white'}}></div>
      <div className={styles.section} style={{backgroundColor: redSection === 1 ? 'red' : 'white'}}></div>
      <div className={styles.section} style={{backgroundColor: redSection === 2 ? 'red' : 'white'}}></div>
    </div>
  );
};
