import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import styles from "./style.scss";
import { useSubscriptionFlow } from "../../utilities/subscription-flow";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Confirmation() {
  const history = useHistory();

  // State to use data and set data to the Context component
  const { subscriptionFlowState } = useSubscriptionFlow();

  // State to handle the form's inputs
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: subscriptionFlowState.user?.email,
    },
  });

  // Function to send all selected data to the API endpoint https://httpbin.org/post
  const onSubmit = async (formData) => {
    const data = {
      durationMonths: subscriptionFlowState.plan.durationMonths,
      priceUsdPerGb: subscriptionFlowState.plan.priceUsdPerGb,
      amountGb: subscriptionFlowState.pricingOptions.amountGb,
      upfrontPayment: subscriptionFlowState.pricingOptions.upfrontPayment,
      cardNumber: subscriptionFlowState.payment.cardNumber,
      cardExpirationDate: subscriptionFlowState.payment.cardExpirationDate,
      cardSecurityCode: subscriptionFlowState.payment.cardSecurityCode,
      email: formData.email,
    };

    // Async await function to watch for errors while sending data do the endpoint
    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast(`🚀   ☁️  Thank you for your order!`);
      } else {
        toast(`🙈 Something went wrong.`);
      }
    } catch (error) {
      toast(`🙈 Something went wrong.`);
    }
  };

  // Users are send to the plans page if there is no plan already selected
  if (!subscriptionFlowState.plan) {
    history.push("/");
    return null;
  }

  return (
    <>
      <h1 className={styles.PageTitle}>Review</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
          label="Email contact"
          placeholder="example@gmail.com"
          type="string"
          errorMessage={
            (errors.email?.type === "required" &&
              "Email contact is required") ||
            (errors.email?.type === "pattern" &&
              "Email contact format is invalid")
          }
        />

        <Input
          {...register("tosAccept", { required: true })}
          label="Accept terms of service"
          type="checkbox"
          errorMessage={
            errors.tosAccept?.type === "required" &&
            "Accepting terms of service is required"
          }
        />

        <div className={styles.Buttons}>
          <Link to="/payment">
            <Button secondary>Back to payment</Button>
          </Link>
          <Link to="/">
            <Button secondary>Edit subscription plan</Button>
          </Link>
          <Button type={"submit"}>Buy now</Button>
        </div>
      </form>
    </>
  );
}
