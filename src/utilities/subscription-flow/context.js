import { createContext } from "react";

export const SubscriptionFlowContext = createContext({
  // {durationMonths, priceUsdPerGb, amountGb}
  plan: null,
  // {cardNumber, cardExpirationDate, cardSecurityCode}
  payment: null,
  // {email}
  user: null,
});
