import React from "react";
import styles from './TFooter.module.css'
import { dataHandler } from "shared-lib/src/utils/dataHandler";

function TFooter({ sortedData }) {
  const summary = dataHandler.getWeightedAverage(sortedData);

  return (
    <tfoot className={styles.tfoot}>
      <tr>
        <td colSpan={2} className={styles.tfoot}></td>
        <td className={styles.tfoot}>{summary.installs}</td>
        <td className={styles.tfoot}>{summary.wA.d0}</td>
        <td className={styles.tfoot}>{summary.wA.d3}</td>
        <td className={styles.tfoot}>{summary.wA.d7}</td>
        <td className={styles.tfoot}>{summary.wA.d30}</td>
        <td className={styles.tfoot}>{summary.wA.d60}</td>
        <td className={styles.tfoot}>{summary.wA.d90}</td>
      </tr>
    </tfoot>
  );
}

export default TFooter;
