import React, { useState, useEffect } from "react";
import styles from "./Ltv.module.css";
import moment from "moment";
import FilterBar from "./FilterBar/FilterBar";
import THeader from "./Theader/THeader";
import TBody from "./TBody/TBody";
import TFooter from "./TFooter/TFooter";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import {apiLtv} from "shared-lib/src/api/api";
import { dataHandler } from "shared-lib/src/utils/dataHandler";


function Ltv() {
  const [allData, setAllData] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: moment().subtract(8, "days").format("YYYY-MM-DD"),
    to: moment().subtract(2, "days").format("YYYY-MM-DD"),
  });
  const [country, setCountry]= useState('US');

  const dateRangeHandler = (from, to) => {
    setDateRange({
      from: from,
      to: to,
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiLtv.getLtv(dateRange.from, dateRange.to, country).then((response) => {
      let data;
      data = response;
      setAllData(data);
      setIsLoading(false)
    });
  }, [dateRange,country]);

  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const copyData = JSON.parse(JSON.stringify(allData));
    const result = dataHandler.getSortedData(copyData);
    setSortedData(result);
  }, [allData]);



  return (
    <div className={styles.container}>
      <FilterBar dateRangeHandler={dateRangeHandler} countryHandler={setCountry}/>
      {isLoading ? <LoadingSpinner/> :
      (sortedData.length === 0) ? <h1 className={styles.title}>Data not available</h1> :
          <div className={styles.overflow__container}>
            <table className={styles.table__dash}>
              <THeader/>
              <TBody sortedData={sortedData}/>
              <TFooter sortedData={sortedData}/>
            </table>
          </div>
      }
    </div>
  );
}

export default Ltv;
