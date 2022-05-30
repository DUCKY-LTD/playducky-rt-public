import React from "react";
import styles from "./DateRangePicker.module.css";

function DateRangePicker({ dateRangeHandler }) {
  return (
    <div className={styles.container}>
      <button type="button" onClick={() => dateRangeHandler(4, 2)}>
        3 days
      </button>
      <button type="button" onClick={() => dateRangeHandler(8, 2)}>
        7 days
      </button>
      <button type="button" onClick={() => dateRangeHandler(31, 2)}>
        30 days
      </button>
    </div>
  );
}

export default DateRangePicker;
