import React from 'react';
import styles from "./DirectionBar.module.css"

export default function ThreeSectionBar({ redSection }: { redSection: number }) {
  const getSectionStyle = (sectionIndex: number) => {
    if (sectionIndex === redSection) {
      return {backgroundImage: 'radial-gradient(red, darkred)'};
    } else {
      return {backgroundColor: 'white'}
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.section} style={getSectionStyle(0)}></div>
      <div className={styles.section} style={getSectionStyle(1)}></div>
      <div className={styles.section} style={getSectionStyle(2)}></div>
    </div>
  );
};
