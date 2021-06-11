import React from "react";
import { useSubscriptionFlow } from "../../utilities/subscription-flow";
import { Container } from "../Container";

import styles from "./style.scss";

export function Summary() {
  const { subscriptionFlowState } = useSubscriptionFlow();
  const { plan, pricingOptions } = subscriptionFlowState;

  console.log(subscriptionFlowState);

  if (!plan) {
    return null;
  }

  const subtotal =
    pricingOptions.amountGb * plan.priceUsdPerGb * plan.durationMonths;

  const discount = pricingOptions.upfrontPayment ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <Container>
      <div className={styles.Summary__Wrapper}>
        <div className={styles.Summary}>
          <div>SUBSCRIPTION</div>
          <div>{plan.durationMonths} months Plan</div>
          <div>{pricingOptions.amountGb} Gb option</div>
          <div>Subtotal: ${subtotal}</div>
          <div>Discount: ${discount}</div>
          <div>Total: ${total}</div>
        </div>
      </div>
    </Container>
  );
}
