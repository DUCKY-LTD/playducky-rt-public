import React from "react";
import styles from "./FilterBar.module.css";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

function FilterBar({ dateRangeHandler }) {
  return (
    <div className={styles.container}>
      <DateRangePicker dateRangeHandler={dateRangeHandler} />
    </div>
  );
}

export default FilterBar;
