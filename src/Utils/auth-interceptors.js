import {useContext} from "react"
import {UserContext} from "../App";
import { tankURL, saleURL } from "./baseUrl";
// import { useHistory } from "react-router-dom";
export function AuthInterceptors () {
  const {state} = useContext(UserContext);
    // let history = useHistory();
    console.log(state)
    const a = "Bearer "
    tankURL.defaults.headers.common['Authorization']= a.concat(state)
    // tankURL.interceptors.response.use(
    //         (response) =>
    //           new Promise((resolve, reject) => {
    //             resolve(response);
    //           }),
    //         (error) => {
    //           console.log(error.response)
    //           if (!error.response) {
    //             return new Promise((resolve, reject) => {
    //               reject(error);
    //             });
    //           }
    //           if (error.response.status === 401) {
    //             console.log("UNAUTHORIZED");
    //            history.push({pathname: `/login`})
    //           } else {
    //             return new Promise((resolve, reject) => {
    //               reject(error);
    //             });
    //           }
    //         }
    //       );
          saleURL.defaults.headers.common['Authorization']= a.concat(state)
          // saleURL.interceptors.response.use(
          //   (response) =>
          //     new Promise((resolve, reject) => {
          //       resolve(response);
          //     }),
          //   (error) => {
          //     console.log(error.response)
          //     if (!error.response) {
          //       return new Promise((resolve, reject) => {
          //         reject(error);
          //       });
          //     }
          //     if (error.response.status === 401) {
          //       console.log("UNAUTHORIZED")
          //      history.push({pathname: `/login`})
          //     } else {
          //       return new Promise((resolve, reject) => {
          //         reject(error);
          //       });
          //     }
          //   }
          // )
return null;
}
