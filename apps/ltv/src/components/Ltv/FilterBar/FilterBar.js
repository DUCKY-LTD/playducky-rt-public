import React from "react";
import styles from "./FilterBar.module.css";
import DateRangePicker from "./DateRangePicker/DateRangePicker";
import CountrySelector from "./CountrySelector/CountrySelector";




function FilterBar({ dateRangeHandler, countryHandler }) {
    return (
        <div className={styles.container}>
            <DateRangePicker dateRangeHandler={dateRangeHandler} />
            <CountrySelector countryHandler={countryHandler}/>
        </div>
    );
}

export default FilterBar;
