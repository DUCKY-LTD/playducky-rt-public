import React from "react";
import styles from './TFooter.module.css'
import { dataHandler } from "shared-lib/src/utils/dataHandler";

function TFooter({ sortedData }) {
  const summary = dataHandler.getWeightedAverage(sortedData);

  return (
    <tfoot className={styles.tFooter}>
      <tr>
        <td colSpan={1}></td>
        <td>{summary.averageCpi}</td>
        <td>{summary.installs}</td>
        <td>{summary.wA.d0}</td>
        <td>{summary.wA.d3}</td>
        <td>{summary.wA.d7}</td>
        <td>{summary.wA.d30}</td>
        <td>{summary.wA.d60}</td>
        <td>{summary.wA.d90}</td>
      </tr>
    </tfoot>
  );
}

export default TFooter;
