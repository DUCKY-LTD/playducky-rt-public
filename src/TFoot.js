import React from "react";

function TFoot({ totalInstalls, weightedAverage }) {
  return (
    <tfoot>
      <tr>
        <td colSpan={2}></td>
        <td>{totalInstalls}</td>
        <td>{weightedAverage.d0}</td>
        <td>{weightedAverage.d3}</td>
        <td>{weightedAverage.d7}</td>
        <td>{weightedAverage.d30}</td>
        <td>{weightedAverage.d60}</td>
        <td>{weightedAverage.d90}</td>
      </tr>
    </tfoot>
  );
}

export default TFoot;
