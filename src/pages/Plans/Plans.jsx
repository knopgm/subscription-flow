import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import { Container } from "../../components/Container";
import { useSubscriptionFlow } from "../../utilities/subscription-flow";
import { Card } from "./components/Card";

//import styles from "./style.scss";

export function Plans() {
  const history = useHistory();
  const { subscriptionFlowState, setPlan } = useSubscriptionFlow();

  console.log({ subscriptionFlowState });

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("https://cloud-storage-prices-moberries.herokuapp.com/prices")
      .then((res) => res.json())
      .then((result) => {
        setPlans(result.subscription_plans);
      });
  }, []);

  const handleSubmit = (data) => {
    setPlan(data);
    history.push("/payment");
  };

  return (
    <Container>
      {plans.map((plan) => {
        return (
          <Card
            durationMonths={plan.duration_months}
            priceUsdPerGb={plan.price_usd_per_gb}
            key={plan.duration_months}
            onSubmit={handleSubmit}
          />
        );
      })}
    </Container>
  );
}
