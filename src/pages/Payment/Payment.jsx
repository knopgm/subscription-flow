import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Container } from "../../components/Container";

import styles from "./style.scss";
import { useSubscriptionFlow } from "../../utilities/subscription-flow";

const InputComponent = (
  { onChange, onBlur, name, label, type = "text" },
  ref
) => (
  <>
    <label>{label}</label>
    <input
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      ref={ref}
    />
  </>
);

const Input = React.forwardRef(InputComponent);

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
    console.log(newPayment);
    setPayment(newPayment);
    history.push("/confirmation");
  };

  return (
    <Container>
      <div className={styles.Payment_Wrapper}>
        <Link to="/">
          <button>Subscription Plans</button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("cardNumber", {
              required: true,
              value: subscriptionFlowState.payment?.cardNumber,
            })}
            label="Card Number"
            type="number"
          />
          {errors.cardNumber?.type === "required" && "Card number is required"}
          <Input
            label="Expire Date"
            {...register("cardExpirationDate", {
              required: true,
              pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
              value: subscriptionFlowState.payment?.cardExpirationDate,
            })}
          />
          {errors.cardExpirationDate?.type === "required" &&
            "Card Expire Date is required"}
          {errors.cardExpirationDate?.type === "pattern" &&
            "Card Expire Date format MM/YY"}
          <Input
            label="Security Code"
            type="number"
            {...register("cardSecurityCode", { required: true })}
          />
          {errors.cardSecurityCode?.type === "required" &&
            "Card Security Code is required"}
          <input type="submit" />
        </form>
      </div>
    </Container>
  );
}
