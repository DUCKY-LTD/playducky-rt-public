import React from "react";
import styles from './THeader.module.css'

function THeader() {
  return (
    <thead className={styles.thead}>
      <tr>
        <th style={{width:"224px"}} className={styles.th}>Install Day</th>
        <th className={styles.th}>CPI</th>
        <th className={styles.th}>Installs</th>
        <th className={styles.th}>Day 0</th>
        <th className={styles.th}>Day 3</th>
        <th className={styles.th}>Day 7</th>
        <th className={styles.th}>Day 30</th>
        <th className={styles.th}>Day 60</th>
        <th className={styles.th}>Day 90</th>
      </tr>
    </thead>
  );
}

export default THeader;
