import { useContext } from "react";
import { UserContext } from "../App";
import { tankURL, saleURL,loginURL } from "./baseUrl";
import { useHistory } from "react-router-dom";
export const AuthInterceptors = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const removeStorage = async () => {
    await localStorage.removeItem("jwt");
    await localStorage.removeItem("user");
    history.push("/login");
    return;
  };
  const a = "Bearer ";
  tankURL.defaults.headers.common["Authorization"] = a.concat(state);
  tankURL.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      console.log(error.response);
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (error.response.status === 401) {
        console.log("UNAUTHORIZED");
        dispatch({ type: "USER", payload: null });
        removeStorage();
        return;
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );
  saleURL.defaults.headers.common["Authorization"] = a.concat(state);
  saleURL.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      console.log(error.response);
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (error.response.status === 401) {
        console.log("UNAUTHORIZED");
        dispatch({ type: "USER", payload: null });
        removeStorage();
        return;
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );
loginURL.interceptors.response.use(
  (response) =>
  new Promise((resolve, reject) => {
    if(response.status === 200){
       dispatch({ type: "USER", payload: response.data.jwt });
       history.push("/");
    }
    resolve(response);
  }),
(error) => {
  console.log(error.response);
  if (!error.response) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
   else {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
}
  )
  return null;
};
