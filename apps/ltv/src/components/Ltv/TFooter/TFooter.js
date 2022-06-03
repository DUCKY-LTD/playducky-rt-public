import React from "react";
import styles from './TFooter.module.css'
import { dataHandler } from "shared-lib/src/utils/dataHandler";

function TFooter({ sortedData }) {
  const summary = dataHandler.getWeightedAverage(sortedData);

  return (
    <tfoot className={styles.tfoot}>
      <tr>
        <td colSpan={2} className={styles.td}></td>
        <td className={styles.td}>{summary.installs}</td>
        <td className={styles.td}>{summary.wA.d0}</td>
        <td className={styles.td}>{summary.wA.d3}</td>
        <td className={styles.td}>{summary.wA.d7}</td>
        <td className={styles.td}>{summary.wA.d30}</td>
        <td className={styles.td}>{summary.wA.d60}</td>
        <td className={styles.td}>{summary.wA.d90}</td>
      </tr>
    </tfoot>
  );
}

export default TFooter;
