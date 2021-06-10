import { useContext } from "react";
import { SubscriptionFlowContext } from "./context";

export function useSubscriptionFlow() {
  return useContext(SubscriptionFlowContext);
}
