import axios from 'axios'
//import config from "@/config.js";
const state = {
    DonorsData: [],
};

const getters = {
    getDonorsData: (state) => state.DonorsData,
};
const actions = {
    getDonor({
        commit
    }) {
        return new Promise((resolve, reject) => {
             let token = localStorage.getItem("token");
             console.log("Token is:"+token)
            axios
                .get("http://127.0.0.1:8000/api/tasks", {
                headers: { Authorization: `Bearer ${token}` },
                    })
                .then(
                    (response) => {
                        console.log("Donor response", response);
                        commit("getDonor", response.data);
                        // http success, call the mutator and change something in state
                        resolve(response); // Let the calling function know that http is done. You may send some data back
                    },
                    (error) => {
                        // http failed, let the calling function know that action did not work out
                        console.log(error);
                        reject(error);
                    }
                );
        });
    },
    addTask({
        commit
    }, userData) {
        let token = localStorage.getItem("token");
        commit("addNewDonor", userData);
        console.log("new userData::", userData);
        axios
            .post("http://127.0.0.1:8000/api/tasks", userData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(function(response) {
                console.log(response.data);
            })
            .catch(function(error) {
                alert(error);
            });
    },
};
const mutations = {
    addNewUser(state, payload) {
        state.DonorsData.push(payload);
    },
    getDonor(state, payload) {
        state.DonorsData = payload;
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};