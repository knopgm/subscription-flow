import React from "react";
import { Switch, Route } from "react-router-dom";

import { Plans } from "./pages/Plans";
import { Payment } from "./pages/Payment";
import { Confirmation } from "./pages/Confirmation";

export function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Plans} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/confirmation" component={Confirmation} />
      </Switch>
    </>
  );
}
