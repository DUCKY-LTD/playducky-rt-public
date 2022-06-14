import React from "react";
import styles from "./FilterBar.module.css";
import DateRangePicker from "./DateRangePicker/DateRangePicker";
import CountrySelector from "./CountrySelector/CountrySelector";
import PlatformSelector from './PlatformSelector/PlatformSelector'




function FilterBar({ dateRangeHandler, countryHandler, platformHandler, iosStatus, gpStatus }) {
    return (
        <div className={styles.container}>
            <DateRangePicker dateRangeHandler={dateRangeHandler} />
            <PlatformSelector platformHandler={platformHandler} iosStatus={iosStatus} gpStatus={gpStatus}/>
            <CountrySelector countryHandler={countryHandler}/>
        </div>
    );
}

export default FilterBar;
