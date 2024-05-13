
import React from 'react';
import styles from './LoadingPage.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
        <div className={styles.thecube}>
        <div className={styles.thecubeLoad1}></div>
        <div className={styles.thecubeLoad2}></div>
        <div className={styles.thecubeLoad4}></div>
        <div className={styles.thecubeLoad3}></div>
</div>
    </div>
  );
};

export default Loading;
