import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store/index';
import axios from 'axios';
// import dotenv from 'dotenv'
// dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_API || "http://geeking.vercel.app";

ReactDOM.render( 
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
); 

reportWebVitals();
