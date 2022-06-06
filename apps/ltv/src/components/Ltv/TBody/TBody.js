import React from "react";
import styles from './TBody.module.css'

function TBody({ sortedData }) {
  return (
    <tbody>
      {sortedData.map((el, idx) => {
        return (
          <tr key={el.install_day}>
            <td style={{width:"220px"}} className={styles.cell}>
              {el.install_day}
            </td>
            <td className={styles.cell}>{el.cpi}</td>
            <td className={styles.cell}>{el.installs}</td>
            <td
              className={styles.cell}>
              {el.d0.value}
            </td>
            <td
              className={styles.cell}>
              {el.d3.value}
            </td>
            <td
              className={styles.cell}>
              {el.d7.value}
            </td>
            <td
              className={styles.cell}>
              {el.d30.value}
            </td>
            <td
              className={styles.cell}>
              {el.d60.value}
            </td>
            <td
              className={styles.cell}>
              {el.d90.value}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TBody;
