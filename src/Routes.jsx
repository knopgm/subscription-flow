import React from "react";
import { Switch, Route } from "react-router-dom";

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={() => <div>Hello world!</div>} />
    </Switch>
  );
}
