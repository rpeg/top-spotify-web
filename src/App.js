import React from "react";
import axios from "axios";
import io from "socket.io-client";

import OAuth from "./components/OAuth";
import { useQueryParam, BooleanParam } from "use-query-params";
import { API_URL } from "./config";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SectionTemplate from "./components/SectionTemplate";
import MainHeader from "./components/MainHeader";

const socket = io(API_URL);

const App = () => {
  return (
    <div className="App">
      <OAuth socket={socket} />
      {/* {isLoggedIn && <MainHeader />}
      {isLoggedIn && <SectionTemplate title="All-time" timeRange="long" />} */}
    </div>
  );
};

export default App;
