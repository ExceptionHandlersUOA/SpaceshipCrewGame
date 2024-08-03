import React from 'react';
import styles from "./DirectionBar.module.css"

export default function ThreeSectionBar({ redSection }: { redSection: number }) {
  const getSectionStyle = (sectionIndex: number) => ({
    flex: 1,
    height: '100%',
    backgroundColor: sectionIndex === redSection ? 'red' : 'white',
    border: '1px solid #ccc',
  });

  return (
    <div className={styles.container}>
      <div style={getSectionStyle(0)}></div>
      <div style={getSectionStyle(1)}></div>
      <div style={getSectionStyle(2)}></div>
    </div>
  );
};
