import axios from "axios";
import config from "@/config.js";

const Register = {
  state: () => ({
    Registration: {},
  }),
  mutations: {
    Registrations(state, newRegistartion) {
      state.Registration = newRegistartion;
    },
  },
  actions: {
    Registrations({ commit }, newRegistartion) {
      return new Promise((resolve, reject) => {
        console.log("new resistration::", newRegistartion);
        axios
          .post(config.API_ROOT_URL + "/register", newRegistartion)
          .then(function(response) {
            console.log(response.data);
            commit("Registrations", newRegistartion);
            resolve(response);
          })
          .catch(function(error) {
            alert(error);
            reject(error);
          });
      });
    },
    // //Add a method to implement Axios
    // test () {
    //       axios.post('URL')
    //       .then(function (response) {
    //         alert (response.data);
    //       })
    //       .catch(function (error) {
    //         alert(error);
    //       });
    //     }
  },
  getters: {
    getRegistrations(state) {
      return state.Registration;
    },
  },
};
export default Register;
