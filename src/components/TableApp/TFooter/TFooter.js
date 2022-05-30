import React from "react";
import { dataHandler } from "../../../utils/dataHandler";

function TFooter({ sortedData }) {
  const summary = dataHandler.getWeightedAverage(sortedData);

  return (
    <tfoot>
      <tr>
        <td colSpan={2}></td>
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
