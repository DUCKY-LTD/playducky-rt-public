import axios from "axios";

const authHash = window.authHash;
const userId = window.userId;

const ltvInst = axios.create({
    baseURL: "https://api.playducky.com/node/",
    headers: {
        user_id: userId,
        hash: authHash,
    },
});


const gameInst = axios.create({
    baseURL: "https://dash.playducky.com/version-kucher-dev/api/1.1/obj/",
    // headers: {
    //     Authorization: `Bearer ${token}`
    // },
});

const wfInst = axios.create({
    baseURL: "https://playducky.bubbleapps.io/version-kucher-dev/api/1.1/wf/",
    // headers: {
    //     Authorization: `Bearer ${token}`
    // },
});

export const apiLtv = {
    getLtv(from, to, options) {
        return ltvInst
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

    getGame(gameId) {
        return gameInst
            .get(`game/${gameId}`
            )
            .then((response) => response.data)
            .catch((error) => {
                console.log("error :", error);
            });
    },

    getTeam(teamId) {
        return gameInst
            .get(`team/${teamId}`
            )
            .then((response) => response.data)
            .catch((error) => {
                console.log("error :", error);
            });
    },

    getProducer(id) {
        return gameInst
            .get(`User/${id}`)
            .then(response => response.data)
            .catch((error) => {
                console.log("error :", error);
            });
    },

    getExperiment(gameId) {
        return gameInst
            .get(`MktTests1?constraints=[ { \"key\": \"GameID\", \"constraint_type\": \"equals\", \"value\": \"${gameId}\" }  ]`
            )
            .then((response) => response.data)
            .catch((error) => {
                console.log("error :", error);
            });
    },

    editGame(gameId, data){
        return gameInst
            .patch(`game/${gameId}`, data)
            .then((response) => response.data)
            .catch((error) => {
                console.log("error :", error);
            });
    },

    createCtrTest(data){
        return gameInst
            .post('MktTests1', data)
            .then((response) => response.data)
            .catch((error) => {
                console.log("error :", error);
            });
    },

    createCpiTest(data){
        return gameInst
            .post('MktTests1', data)
            .then((response) => response.data)
            .catch((error) => {
                console.log("error :", error);
            });
    },

    triggerCtrWf(id){
        return wfInst
            .post('on_ctr_test_create', {id})
            .then(response => response)
            .catch((error) => {
                console.log("error :", error);
            });
    },

    triggerCpiWf(id){
        return wfInst
            .post('on_cpi_test_create', {id})
            .then(response => response)
            .catch((error) => {
                console.log("error :", error);
            });
    }
};

// static api for debug

// const ltvInst = axios.create({
//     baseURL: "https://api.playducky.com/node/",
//     headers: {
//         user_id: '1635938197686x803017063599902300',
//         hash: 'a9241b6c8c9d8d8cbf104f2f00db62f155bab79971433bd2e6b3f03f67919a0b',
//     },
// });
//
//
// const gameInst = axios.create({
//     baseURL: "https://dash.playducky.com/version-kucher-dev/api/1.1/obj/",
//     headers: {
//         Authorization: `Bearer ${token}`
//     },
// });
//
// const wfInst = axios.create({
//     baseURL: "https://playducky.bubbleapps.io/version-kucher-dev/api/1.1/wf/",
//     headers: {
//         Authorization: `Bearer ${token}`
//     },
// });
//
//
// export const apiLtv = {
//     getLtv(from, to, options) {
//         return ltvInst
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
//      getGame(gameId) {
//         return gameInst
//             .get(`game/${gameId}`
//             )
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.log("error :", error);
//             });
//     },
//
//     getTeam(teamId) {
//         return gameInst
//             .get(`team/${teamId}`
//             )
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.log("error :", error);
//             });
//     },
//
//     getProducer(id) {
//        return gameInst
//             .get(`User/${id}`)
//             .then(response => response.data)
//             .catch((error) => {
//                 console.log("error :", error);
//             });
//     },
//
//     getExperiment(gameId) {
//         return gameInst
//             .get(`MktTests1?constraints=[ { \"key\": \"GameID\", \"constraint_type\": \"equals\", \"value\": \"${gameId}\" }  ]`
//             )
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.log("error :", error);
//             });
//     },
//
//     editGame(gameId, data){
//         return gameInst
//             .patch(`game/${gameId}`, data)
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.log("error :", error);
//             });
//     },
//
//     createCtrTest(data){
//         return gameInst
//             .post('MktTests1', data)
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.log("error :", error);
//             });
//     },
//
//     createCpiTest(data){
//         return gameInst
//             .post('MktTests1', data)
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.log("error :", error);
//             });
//     },
//
//     triggerCtrWf(id){
//         return wfInst
//             .post('on_ctr_test_create', {id})
//             .then(response => response)
//             .catch((error) => {
//                 console.log("error :", error);
//             });
//     },
//
//     triggerCpiWf(id){
//         return wfInst
//             .post('on_cpi_test_create', {id})
//             .then(response => response)
//             .catch((error) => {
//                 console.log("error :", error);
//             });
//     }
// };
