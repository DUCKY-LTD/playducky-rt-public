import axios from "axios";

const authHash = window.authHash;
const userId = window.userId;
const gPBundleId = window.gPBundleId;
const iOsAppId = window.iOsAppId;

const instance = axios.create({
  baseURL: "https://api.playducky.com/node/",
  headers: {
    "user_id": userId,
    "hash": authHash,
  },
});

console.log( authHash);
console.log(userId);
console.log(gPBundleId);
console.log(iOsAppId);

export const apiLtv = {
  getLtv(from, to, country) {
    // console.log('FROM:__'+from, ' TO:___'+to, ' Country:____'+country)
    return instance
      .get(
        `ltv_by_app?app_id=${gPBundleId}&app_id=${iOsAppId}&from=${from}&to=${to}&country=${country}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.log("error :", error);
      });
  },
};
