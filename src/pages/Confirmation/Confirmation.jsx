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
  const { subscriptionFlowState, setUser } = useSubscriptionFlow();

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

  // Function to store data on the Context Component
  const onSubmit = (newUser) => {
    setUser(newUser);
    toast(`🚀   ☁️  Thank you for your order!`);
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
