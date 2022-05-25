import React from "react";
import "./Table.css";
import axios from "axios";
import { mockUp } from "./shared/mockUpData";
import THead from "./THead";
import TBody from "./TBody";
import TFoot from "./TFoot";

function Table() {
  return (
    <div className="container">
      <table className="table">
        <THead />
        <TBody data={mockUp.data} />
        <TFoot
          totalInstalls={mockUp.totalInstalls}
          weightedAverage={mockUp.weightedAverage}
        />
      </table>
    </div>
  );
}

export default Table;
