import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

import { Container } from "../../components/Container";
import { useSubscriptionFlow } from "../../utilities/subscription-flow";
import { SubscriptionForm } from "./components/SubscriptionForm";

//import styles from "./style.scss";

export function Plans() {
  const history = useHistory();
  const {
    subscriptionFlowState,
    setPlan,
    setPricingOptions,
  } = useSubscriptionFlow();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      amountGb: subscriptionFlowState.pricingOptions.amountGb,
      upfrontPayment: subscriptionFlowState.pricingOptions.upfrontPayment,
    },
  });

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("https://cloud-storage-prices-moberries.herokuapp.com/prices")
      .then((res) => res.json())
      .then((result) => {
        setPlans(result.subscription_plans);
      });
  }, []);

  const { amountGb, upfrontPayment } = watch();

  const [selectedPlan, setSelectedPlan] = useState({
    durationMonths: 12,
    priceUsdPerGb: 2,
    id: 2,
  });

  const handlePlanSelect = (data) => {
    setSelectedPlan(data);
  };

  const onSubmit = (data) => {
    const plan = {
      durationMonths: selectedPlan.durationMonths,
      priceUsdPerGb: selectedPlan.priceUsdPerGb,
    };
    const pricingOptions = {
      amountGb: data.amountGb,
      upfrontPayment: data.upfrontPayment,
    };
    setPlan(plan);
    setPricingOptions(pricingOptions);

    history.push("/payment");
  };

  const subtotal =
    amountGb * selectedPlan?.priceUsdPerGb * selectedPlan?.durationMonths;

  const discount = upfrontPayment ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <Container>
      <header>
        <h1>Welcome to Cloudy</h1>
        <h2>Your Cloud Storage Service</h2>
      </header>

      {plans.map((plan, index) => {
        return (
          <SubscriptionForm
            selected={selectedPlan?.id === index}
            durationMonths={plan.duration_months}
            priceUsdPerGb={plan.price_usd_per_gb}
            key={index}
            id={index}
            onSelect={handlePlanSelect}
          />
        );
      })}

      <div>
        <div>Select the Amount of Gb:</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("amountGb")}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
          </select>

          <label htmlFor="upfrontPayment">Upfront Payment</label>
          <input
            {...register("upfrontPayment", { required: false })}
            type="checkbox"
          />

          <div>Subtotal: ${subtotal}</div>
          <div>Discount: ${discount}</div>
          <div>Total: ${total}</div>

          <input type="submit" />
        </form>
      </div>
    </Container>
  );
}
