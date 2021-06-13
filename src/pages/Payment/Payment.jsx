import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./style.scss";
import { useSubscriptionFlow } from "../../utilities/subscription-flow";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Payment() {
  // State to use data and set data to the Context component
  const { subscriptionFlowState, setPayment } = useSubscriptionFlow();
  const history = useHistory();

  // State to handle the form's inputs
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //Function to store data on the Context Component
  const onSubmit = (newPayment) => {
    setPayment(newPayment);
    history.push("/confirmation");
  };

  // Users are send to the plans page if there is no plan already selected
  if (!subscriptionFlowState.plan) {
    history.push("/");
    return null;
  }

  return (
    <>
      <h1 className={styles.PageTitle}>Payment</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
        <Input
          {...register("cardNumber", { required: true })}
          label="Credit card number"
          placeholder="Credit card number"
          errorMessage={
            errors.cardNumber?.type === "required" && "Card number is required"
          }
        />
        <Input
          {...register("cardExpirationDate", {
            required: true,
            pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
          })}
          label="Expiration date"
          placeholder="Expiration date"
          errorMessage={
            (errors.cardExpirationDate?.type === "required" &&
              "Card expire date is required") ||
            (errors.cardExpirationDate?.type === "pattern" &&
              "Card expire fate format MM/YY")
          }
        />
        <Input
          type="number"
          {...register("cardSecurityCode", { required: true })}
          label="Security code"
          placeholder="Security code"
          errorMessage={
            errors.cardSecurityCode?.type === "required" &&
            "Card Security Code is required"
          }
        />

        <div className={styles.Buttons}>
          <Link to="/">
            <Button secondary>Back to subscription plans</Button>
          </Link>
          <Button type="submit">Confirm payment</Button>
        </div>
      </form>
    </>
  );
}
