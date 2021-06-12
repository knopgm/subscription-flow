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

  return (
    <div className={styles.Wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
        <div className={styles.InnerWrapper}>
          <Input
            {...register("cardNumber", {
              required: true,
              value: subscriptionFlowState.payment?.cardNumber,
            })}
            label="Credit card number"
            placeholder="Credit card number"
            errorMessage={
              errors.cardNumber?.type === "required" &&
              "Card number is required"
            }
          />
          <div className={styles.ExpCodeWrapper}>
            <Input
              {...register("cardExpirationDate", {
                required: true,
                pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                value: subscriptionFlowState.payment?.cardExpirationDate,
              })}
              label="Expiration date"
              placeholder="Expiration date"
              errorMessage={
                (errors.cardExpirationDate?.type === "required" &&
                  "Card Expire Date is required") ||
                (errors.cardExpirationDate?.type === "pattern" &&
                  "Card Expire Date format MM/YY")
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
          </div>
        </div>

        <div className={styles.Buttons}>
          <Link to="/">
            <Button>Back to subscription plans</Button>
          </Link>
          <Button type={"submit"}>Confirm payment</Button>
        </div>
      </form>
    </div>
  );
}
