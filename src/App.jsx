import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SubscriptionFlowProvider } from "./foundation/SubscriptionFlowProvider";

import { Routes } from "./Routes";
import "./styles/all.scss";

export function App() {
  return (
    <Router>
      <SubscriptionFlowProvider>
        <Routes />
      </SubscriptionFlowProvider>
    </Router>
  );
}
