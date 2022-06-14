import axios from "axios";

const authHash = window.authHash;
const userId = window.userId;


const instance = axios.create({
  baseURL: "https://api.playducky.com/node/",
  headers: {
    "user_id": userId,
    "hash": authHash,
  },
});

console.log(authHash);
console.log(userId);


export const apiLtv = {
    getLtv(from, to, options) {
        // console.log('getLtvByDate FROM:__'+from, ' TO:___'+to, options);
        //app_id=${iOsAppId}&app_id=id1609950100&from=${from}&to=${to}?country=${country}
        return instance
            .get(
                `ltv_by_app`, {
                    params: {
                        app_id: [...options.app_id],
                        from,
                        to,
                        ...options
                    }
                }
            )
            .then((response) => response.data)
            .catch((error) => {
                console.log("error :", error);
            });
    },

};

// static api for debug



// const instance = axios.create({
//     baseURL: "https://api.playducky.com/node/",
//     headers: {
//         user_id: '1635938197686x803017063599902300',
//         hash: 'a9241b6c8c9d8d8cbf104f2f00db62f155bab79971433bd2e6b3f03f67919a0b',
//     },
// });
//
//
// export const apiLtv = {
//     getLtv(from, to, options) {
//         // console.log('getLtvByDate FROM:__'+from, ' TO:___'+to, options);
//         //app_id=${iOsAppId}&app_id=id1609950100&from=${from}&to=${to}?country=${country}
//         return instance
//             .get(
//                 `ltv_by_app`, {
//                     params: {
//                         app_id: [...options.app_id],
//                         from,
//                         to,
//                         ...options
//                     }
//                 }
//             )
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.log("error :", error);
//             });
//     },
//
// };
