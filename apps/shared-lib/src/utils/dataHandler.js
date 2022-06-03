export const dataHandler = {
  getSortedData(data) {
    console.log(data);

    let badData = false;

    data.forEach((el)=> {
      for(let key in el){
        if(key.includes("cpi") && el[key] === null){
          badData = true
        }
      }
    })

    if(!badData){
      data.forEach((el) => {
        for (const key in el) {
          if (key.includes("fact_ltv")) {
            el[key] = el[key].toFixed(3);
          }
          if (key.includes("pred_ltv")) {
            el[key] = el[key].toFixed(3);
          }
          if (key.includes("cpi")) {
            el[key] = el[key].toFixed(3);
          }
        }
      });

      const currentDate = new Date();

      data.forEach((el) => {
        for (const key in el) {
          let parseDate;
          if (key === "install_day") {
            parseDate = new Date(Date.parse(el[key]));
          }
          let diffInDay = Math.floor((currentDate - parseDate) / 86400000);
          // console.log(diffInDay);

          //0day
          if (diffInDay >= 1) {
            el["d0"] = { value: el["fact_ltv_d0"], type: "fact" };
          }

          //3day
          if (diffInDay >= 3) {
            el["d3"] = { value: el["fact_ltv_d3"], type: "fact" };
          } else if (diffInDay <= 3) {
            el["d3"] = { value: el["pred_ltv_d3"], type: "pred" };
          }
          //7day
          if (diffInDay >= 7) {
            el["d7"] = { value: el["fact_ltv_d7"], type: "fact" };
          } else if (diffInDay <= 7) {
            el["d7"] = { value: el["pred_ltv_d7"], type: "pred" };
          }
          //30day
          if (diffInDay >= 30) {
            el["d30"] = { value: el["fact_ltv_d30"], type: "fact" };
          } else if (diffInDay <= 30) {
            el["d30"] = { value: el["pred_ltv_d30"], type: "pred" };
          }
          //60day
          if (diffInDay >= 60) {
            el["d60"] = { value: el["fact_ltv_d60"], type: "fact" };
          } else if (diffInDay <= 60) {
            el["d60"] = { value: el["pred_ltv_d60"], type: "pred" };
          }
          //90day
          if (diffInDay >= 90) {
            el["d90"] = { value: el["fact_ltv_d90"], type: "fact" };
          } else if (diffInDay <= 90) {
            el["d90"] = { value: el["pred_ltv_d90"], type: "pred" };
          }
        }
      });

      return data;
    }

    return [];
  },

  getWeightedAverage(data) {
    const sumInstalls = [];
    const dayVertical = {};

    data.forEach((el) => {
      for (const key in el) {
        if (key.includes("installs")) {
          sumInstalls.push(el[key]);
        }
      }
    });

    data.forEach((el) => {
      for (let key in el) {
        if (key.match(/^d[0-9]/)) {
          if (!dayVertical.hasOwnProperty(key)) {
            dayVertical[key] = [];
          }
          dayVertical[key].push(Number(el[key].value) * el.installs);
        }
      }
    });

    // средневзвешенное арифметическое d0-d90, cумма installs
    const totalInstalls = sumInstalls.reduce(
      (sum, current) => sum + current,
      0
    );

    function doWeightedAverage(day) {
      return (
        day.reduce((sum, current) => sum + current, 0) / totalInstalls
      ).toFixed(3);
    }

    for (let day in dayVertical) {
      dayVertical[day] = doWeightedAverage(dayVertical[day]);
    }
    return {
      installs: totalInstalls,
      wA: dayVertical,
    };
  },
};
