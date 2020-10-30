import React from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./components/Layout";


function App() {
  return (
    
    <Provider store={store}>
      <Layout  />
    </Provider>
  );
}

export default App;
