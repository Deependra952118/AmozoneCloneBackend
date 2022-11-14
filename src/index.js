import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Contextprovider from "./components/context/Contextprovider";

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <Contextprovider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Contextprovider>
  ,
  document.getElementById('root')
);
