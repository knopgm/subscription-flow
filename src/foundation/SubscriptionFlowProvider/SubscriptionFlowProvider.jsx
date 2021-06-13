import React, { useState } from "react";
import { SubscriptionFlowContext } from "../../utilities/subscription-flow";

// A context created to store the selections in each page
export function SubscriptionFlowProvider({ children }) {
  const [subscriptionFlowState, setSubscriptionFlowState] = useState({
    // {durationMonths, priceUsdPerGb}
    plan: null,
    // {amountGb, upfrontPayment}
    pricingOptions: { amountGb: 5, upfrontPayment: false },
    // {cardNumber, cardExpirationDate, cardSecurityCode}
    payment: null,
  });

  const setPlan = (newPlan) => {
    setSubscriptionFlowState((currentValue) => {
      return { ...currentValue, plan: newPlan };
    });
  };

  const setPricingOptions = (newPricingOptions) => {
    setSubscriptionFlowState((currentValue) => {
      return { ...currentValue, pricingOptions: newPricingOptions };
    });
  };

  const setPayment = (newPayment) => {
    setSubscriptionFlowState((currentValue) => {
      return { ...currentValue, payment: newPayment };
    });
  };

  return (
    <SubscriptionFlowContext.Provider
      value={{
        subscriptionFlowState,
        setPlan,
        setPricingOptions,
        setPayment,
      }}
    >
      {children}
    </SubscriptionFlowContext.Provider>
  );
}
