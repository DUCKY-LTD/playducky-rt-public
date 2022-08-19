import moment from "moment";

export const dataHandler = {
  getSortedData(data) {
    // console.log(data)

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
    const cpi = [];

    data.forEach((el) => {
      for (const key in el) {
        if (key.includes("installs")) {
          sumInstalls.push(el[key]);
        }
      }
    });

    data.forEach((el) => {
      for (const key in el) {
        if (key.includes("cpi")) {
          cpi.push(+el[key]);
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

    const averageCpi = (
        cpi.reduce((sum, current) => sum + current, 0) / cpi.length
    ).toFixed(3);


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
      averageCpi
    };
  },

  getExperiment(data) {
    const sortedData = [];

    data.map(el => {
      createData(el.TestNo, el.Type, (moment(el['Created Date']).format('MMM DD, YYYY')), el.Status,
          el['Tested Creatives'], el.DevExperimentComments, el.CTR_number, el.CPI_best, el._id)
    })

    function createData(index, type, date, status, creatives, whatsNew, bestCtr, bestCpi, id) {
      sortedData.push({ index, type, date, status, creatives, whatsNew, bestCtr, bestCpi, id }) ;
    }

    return sortedData.reverse();
  },

  editGame(data, imgUrl){

    const {gameTitle, shortDescription, fullDescription, link, gpBundleId, iosBundleId, iosAppId} = data;

    let sortedData = {};
    const GamePlayVideoLink = 'Gameplay Video Link';

    function createData(GameName, ShortDescription, Description,
                         GPStoreBundleID, iOsStoreBundleID, iOsStoreAppID, GameIcon) {
      sortedData = {GameName, ShortDescription, Description,
        GPStoreBundleID, iOsStoreBundleID, iOsStoreAppID, GameIcon} ;
    }
    createData(gameTitle, shortDescription, fullDescription, gpBundleId, iosBundleId, iosAppId, imgUrl);

    sortedData['Gameplay Video Link'] = link;

    return sortedData;
  },

  createNewCtrTest(stateData, experimentData, gameId,  teamData){
    const {_id} = teamData;

    function createNextIndex () {
      let currentIndex = 0;
      if (experimentData.length > 0) {
        experimentData.forEach((el, idx) => {
          if(idx === 0) currentIndex = el.index + 1
        })
        return currentIndex
      } else {
        return currentIndex = 1
      }
    }

    return {
      'GameID': gameId,
      Type: 'CTR',
      TestNo: createNextIndex(),
      'Tested Creatives': stateData.creatives,
      Status: 'Waiting for approval',
      'Tested Game': gameId,
      'Testing Team': _id,
      DevExperimentComments: stateData.whatsNew
    };
  },

  createNewCpiTest(stateData, experimentData, gameId,  teamData){
    const {_id} = teamData;

    function createNextIndex () {
      let currentIndex = 0;
      if (experimentData.length > 0) {
        experimentData.forEach((el, idx) => {
          if(idx === 0) currentIndex = el.index + 1
        })
        return currentIndex
      } else {
        return currentIndex = 1
      }
    }

    const url = window.location.href.match(/https\:\/\/dash\.playducky\.com\/(.*)\/dashboard\/(.*)/);

    function makeDiffIdForTestTypes() {
      if (url) {
        if (url[1] === "version-kucher-dev" || url[1] === "version-test") {
          return '1659977640390x603475473865946500';
        } else {
          return '1660918204312x586228926047557900';
        }
      } else {
        return '1660918204312x586228926047557900';
      }
    }


    return {
      'GameID': gameId,
      Type: 'CPI+Ret',
      'Test Type': makeDiffIdForTestTypes(),
      TestNo: createNextIndex(),
      'Tested Creatives': stateData.creatives,
      Status: 'Waiting for approval',
      'Tested Game': gameId,
      'Testing Team': _id,
      LinkToTestedApp: stateData.link,
      Platform: stateData.platform
    };
  },

  redirectToTestPage(userId, testId) {
    const url = window.location.href.match(/https\:\/\/dash\.playducky\.com\/(.*)\/dashboard\/(.*)/);

     if(testId){
         if (url) {
             return (
                 "https://dash.playducky.com/" +
                 url[1] +
                 "/dashboard/" +
                 userId +
                 "?debug_mode=true&menu=MktTestInfo&MktTestID=" +
                 testId
             );
         } else {
           return (
               "https://dash.playducky.com/dashboard/" +
               userId +
               "?menu=MktTestInfo&MktTestID=" +
               testId
           );
       }
     }
  },

  modifyNotionId (NotionId) {
    if (NotionId){
      let result = '';
      for (let letter of NotionId) {
        if(letter !== '-') result += letter
      }
      return `https://www.notion.so/playducky/61923c2f4c9846d78ea39eb61a18a1df?v=005720ff02b14720ad3450395bcfd929&p=${result}&pm=s`
    } else return NotionId
  }
};
