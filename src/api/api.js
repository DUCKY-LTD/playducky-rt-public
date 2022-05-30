import axios from "axios";
import moment from "moment";

const instance = axios.create({
  baseURL: "https://api.playducky.com/node/",
  headers: {
    user_id: "1635938197686x803017063599902300",
    hash: "a9241b6c8c9d8d8cbf104f2f00db62f155bab79971433bd2e6b3f03f67919a0b",
  },
});

// const params = {
//   from: moment().subtract(8, "days").format("YYYY-MM-DD"),
//   to: moment().subtract(2, "days").format("YYYY-MM-DD"),
//   country: "US",
// };

export const apiLtv = {
  getLtv(from, to) {
    return instance
      .get(
        `ltv_by_app?app_id=ru.IJunior.MonsterMergeRun&app_id=io.hyperhug.mr.slice&from=${from}&to=${to}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.log("error :", error);
      });
  },
};
