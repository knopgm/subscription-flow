import React, { useState } from "react";
import { SubscriptionFlowContext } from "../../utilities/subscription-flow";

export function SubscriptionFlowProvider({ children }) {
  const [subscriptionFlowState, setSubscriptionFlowState] = useState({
    // {durationMonths, priceUsdPerGb, amountGb}
    plan: null,
    // {cardNumber, cardExpirationDate, cardSecurityCode}
    payment: null,
    // {email}
    user: null,
  });

  const setPlan = (newPlan) => {
    setSubscriptionFlowState((currentValue) => {
      return { ...currentValue, plan: newPlan };
    });
  };

  const setPayment = (newPayment) => {
    setSubscriptionFlowState((currentValue) => {
      return { ...currentValue, payment: newPayment };
    });
  };

  const setUser = (newUser) => {
    setSubscriptionFlowState((currentValue) => {
      return { ...currentValue, user: newUser };
    });
  };

  return (
    <SubscriptionFlowContext.Provider
      value={{ subscriptionFlowState, setPlan, setPayment, setUser }}
    >
      {children}
    </SubscriptionFlowContext.Provider>
  );
}
