import React from "react";

function TBody({ sortedData }) {
  return (
    <tbody>
      {sortedData.map((el, idx) => {
        return (
          <tr key={el.install_day}>
            <td className="cell">
              {el.install_day + "   _________:   " + (idx + 1)}
            </td>
            <td className="cell">{el.cpi}</td>
            <td className="cell">{el.installs}</td>
            <td
              className="cell"
              style={{
                backgroundColor: el.d0.type === "fact" ? "#77AAD1" : "#FFFFFF",
                color: el.d0.type === "fact" ? "#FFFFFF" : "#6E6C6C",
              }}
            >
              {el.d0.value}
            </td>
            <td
              className="cell"
              style={{
                backgroundColor: el.d3.type === "fact" ? "#77AAD1" : "#FFFFFF",
                color: el.d3.type === "fact" ? "#FFFFFF" : "#6E6C6C",
              }}
            >
              {el.d3.value}
            </td>
            <td
              className="cell"
              style={{
                backgroundColor: el.d7.type === "fact" ? "#77AAD1" : "#FFFFFF",
                color: el.d7.type === "fact" ? "#FFFFFF" : "#6E6C6C",
              }}
            >
              {el.d7.value}
            </td>
            <td
              className="cell"
              style={{
                backgroundColor: el.d30.type === "fact" ? "#77AAD1" : "#FFFFFF",
                color: el.d30.type === "fact" ? "#FFFFFF" : "#6E6C6C",
              }}
            >
              {el.d30.value}
            </td>
            <td
              className="cell"
              style={{
                backgroundColor: el.d60.type === "fact" ? "#77AAD1" : "#FFFFFF",
                color: el.d60.type === "fact" ? "#FFFFFF" : "#6E6C6C",
              }}
            >
              {el.d60.value}
            </td>
            <td
              className="cell"
              style={{
                backgroundColor: el.d90.type === "fact" ? "#77AAD1" : "#FFFFFF",
                color: el.d90.type === "fact" ? "#FFFFFF" : "#6E6C6C",
              }}
            >
              {el.d90.value}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TBody;
