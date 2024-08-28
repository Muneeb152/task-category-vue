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
                        resolve(response);
                    },
                    (error) => {
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
                alert("Task Added Successfully")
                console.log(response.data);
            })
            .catch(function(error) {
                alert(error);
            });
    },
    addCategory({
    }, userData) {
        let token = localStorage.getItem("token");
        axios
            .post("http://127.0.0.1:8000/api/categories", userData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(function(response) {
                alert("Category Added Successfully")
                console.log(response.data);
            })
            .catch(function(error) {
                alert(error);
            });
    },
    updateTask({ commit }, payload) {
        const { taskIndex, updatedData } = payload;
        let token = localStorage.getItem("token");
        const taskId = taskIndex;
      
        axios
          .put(`http://127.0.0.1:8000/api/tasks/${taskId}`, updatedData, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(function(response) {
            console.log(response.data);
            alert("Task Updated Successfully")
            //commit("updateExistingTask", { taskIndex, updatedTask: response.data });
          })
          .catch(function(error) {
            alert(error.response.data.message || error);
          });
      },

      deleteTask({ commit }, { taskId }) {
        let token = localStorage.getItem("token");
        return axios
          .delete(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => {
            alert("Task Deleted Successfully", response.data);
            return response.data;
          })
          .catch(error => {
            alert(error);
            throw error;
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