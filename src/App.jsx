import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Frame } from "./foundation/Frame";
import { SubscriptionFlowProvider } from "./foundation/SubscriptionFlowProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes } from "./Routes";
import "./styles/all.scss";

export function App() {
  return (
    <>
      <Router>
        <SubscriptionFlowProvider>
          <Frame>
            <Routes />
          </Frame>
        </SubscriptionFlowProvider>
      </Router>
      <ToastContainer />
    </>
  );
}
