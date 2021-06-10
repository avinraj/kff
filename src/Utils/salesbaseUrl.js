import axios from 'axios';
const saleURL =  axios.create({
  baseURL: `http://localhost:3030/sale/`
});
const tankURL =  axios.create({
  baseURL: `http://localhost:3030/tanks/`
});
export  {saleURL,tankURL}