import axios from "axios";

// const authHash = window.authHash;
// const userId = window.userId;
// const gPBundleId = window.gPBundleId;
// const iOsAppId = window.iOsAppId;
//
// const instance = axios.create({
//   baseURL: "https://api.playducky.com/node/",
//   headers: {
//     "user_id": userId,
//     "hash": authHash,
//   },
// });
//
// console.log( authHash);
// console.log(userId);
// console.log(gPBundleId);
// console.log(iOsAppId);
//
// export const apiLtv = {
//   getLtv(from, to, country) {
//     // console.log('FROM:__'+from, ' TO:___'+to, ' Country:____'+country)
//     return instance
//         .get(
//             `ltv_by_app?app_id=${gPBundleId}&app_id=${iOsAppId}&from=${from}&to=${to}&country=${country}`
//         )
//         .then((response) => response.data)
//         .catch((error) => {
//           console.log("error :", error);
//         });
//   },
// };

// static api for debug

const instance = axios.create({
    baseURL: "https://api.playducky.com/node/",
    headers: {
        user_id: '1635938197686x803017063599902300',
        hash: 'a9241b6c8c9d8d8cbf104f2f00db62f155bab79971433bd2e6b3f03f67919a0b',
    },
});


console.log( authHash);
console.log(userId);
console.log(gPBundleId);
console.log(iOsAppId);

export const apiLtv = {
    getLtvByDate(from, to) {
        console.log('FROM:__'+from, ' TO:___'+to,)
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
