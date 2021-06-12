import React from "react";
import { useSubscriptionFlow } from "../../utilities/subscription-flow";

import styles from "./style.scss";

export function Summary() {
  const { subscriptionFlowState } = useSubscriptionFlow();
  const { plan, pricingOptions } = subscriptionFlowState;

  if (!plan) {
    return (
      <div className={styles.Wrapper}>
        <div className={styles.Summary}>
          <div className={styles.Title}>YOUR SUBSCRIPTION AT CLOUDY</div>
          <div className={styles.Selection}>
            <div>No plan selected</div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal =
    pricingOptions.amountGb * plan.priceUsdPerGb * plan.durationMonths;

  const discount = pricingOptions.upfrontPayment ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Summary}>
        <div className={styles.Title}>YOUR SUBSCRIPTION AT CLOUDY</div>
        <div className={styles.Selection}>
          <div className={styles.PackageName}>
            {plan.durationMonths === 3 ? (
              <div>Package Basic</div>
            ) : plan.durationMonths === 6 ? (
              <div>Package Pro</div>
            ) : (
              <div>Package Ultimate</div>
            )}
          </div>
          <div className={styles.Subitle}>Plan Duration:</div>
          <div>{plan.durationMonths} months Package</div>
          <div>${plan.priceUsdPerGb} per Gb</div>
          <div className={styles.Subitle}>Gb amount:</div>
          <div>{pricingOptions.amountGb} Gb option</div>
        </div>
        <div className={styles.SelectionPrices}>
          <div>Subtotal: ${subtotal}</div>
          <div>Discount: ${discount}</div>
          <div>Total: ${total}</div>
        </div>
      </div>
    </div>
  );
}
