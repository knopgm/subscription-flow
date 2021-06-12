import React, { useState } from "react";
import { SubscriptionFlowContext } from "../../utilities/subscription-flow";

export function SubscriptionFlowProvider({ children }) {
  const [subscriptionFlowState, setSubscriptionFlowState] = useState({
    // {durationMonths, priceUsdPerGb}
    plan: null,
    // {amountGb, upfrontPayment}
    pricingOptions: { amountGb: 5, upfrontPayment: false },
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

  const setUser = (newUser) => {
    setSubscriptionFlowState((currentValue) => {
      return { ...currentValue, user: newUser };
    });
  };

  return (
    <SubscriptionFlowContext.Provider
      value={{
        subscriptionFlowState,
        setPlan,
        setPricingOptions,
        setPayment,
        setUser,
      }}
    >
      {children}
    </SubscriptionFlowContext.Provider>
  );
}
