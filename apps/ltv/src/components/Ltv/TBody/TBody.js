import React from "react";
import styles from './TBody.module.css'

// dynamic styles for td
const makeColorLtv = (type)=>{
  const cellClasses = [styles.cell];

  if(type === 'fact'){
    cellClasses.push(styles.fact);
    return cellClasses.join(' ')
  }
  else {
    cellClasses.push(styles.pred);
    return cellClasses.join(' ')
  }
}

function TBody({ sortedData }) {
  return (
    <tbody id='cohort'>
      {sortedData.map((el, idx) => {
        return (
          <tr key={el.install_day} >
            <td style={{width:"220px"}} className={styles.cell}>
              {el.install_day}
            </td>
            <td className={styles.cell}>{el.cpi}</td>
            <td className={styles.cell}>{el.installs}</td>
            <td
              className={makeColorLtv(el.d0.type)}>
              {el.d0.value}
            </td>
            <td
              className={makeColorLtv(el.d3.type)}>
              {el.d3.value}
            </td>
            <td
              className={makeColorLtv(el.d7.type)}>
              {el.d7.value}
            </td>
            <td
              className={makeColorLtv(el.d30.type)}>
              {el.d30.value}
            </td>
            <td
              className={makeColorLtv(el.d60.type)}>
              {el.d60.value}
            </td>
            <td
              className={makeColorLtv(el.d90.type)}>
              {el.d90.value}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TBody;
