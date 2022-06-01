import React, { useState, useEffect } from "react";
import "./Ltv.css";
import moment from "moment";
import FilterBar from "./FilterBar/FilterBar";
import THeader from "./Theader/THeader";
import TBody from "./TBody/TBody";
import TFooter from "./TFooter/TFooter";
import {apiLtv} from "shared-lib/src/api/api";
import { dataHandler } from "shared-lib/src/utils/dataHandler";

function Ltv() {
  const [allData, setAllData] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: moment().subtract(8, "days").format("YYYY-MM-DD"),
    to: moment().subtract(2, "days").format("YYYY-MM-DD"),
  });

  const dateRangeHandler = (from, to) => {
    // console.log("from: " + from, "to: " + to);
    setDateRange({
      from: from,
      to: to,
    });
  };

  useEffect(() => {
    apiLtv.getLtv(dateRange.from, dateRange.to).then((response) => {
      const data = response;
      setAllData(data);
    });
  }, [dateRange]);

  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const copyData = JSON.parse(JSON.stringify(allData));
    const result = dataHandler.getSortedData(copyData);
    setSortedData(result);
  }, [allData]);

  return (
    <div className="container">
      <FilterBar dateRangeHandler={dateRangeHandler} />
      <table className="table">
        <THeader />
        <TBody sortedData={sortedData} />
        <TFooter sortedData={sortedData} />
      </table>
    </div>
  );
}

export default Ltv;
