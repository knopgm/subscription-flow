import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./style.scss";
import { useSubscriptionFlow } from "../../utilities/subscription-flow";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Confirmation() {
  // State to use data and set data to the Context component
  const { subscriptionFlowState, setUser } = useSubscriptionFlow();

  // State to handle the form's inputs
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //Function to store data on the Context Component
  const onSubmit = (newUser) => {
    console.log(newUser);
    setUser(newUser);
  };

  return (
    <div className={styles.Wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.ConfirmationInputs}>
          <Input
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              value: subscriptionFlowState.user?.email,
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
          <div className={styles.TosAccept}>
            <Input
              {...register("tosAccept", { required: true })}
              label="Accept terms of service"
              type="checkbox"
              errorMessage={
                errors.tosAccept?.type === "required" &&
                "Accepting terms of service is required"
              }
            />
          </div>
        </div>

        <div className={styles.Buttons}>
          <Link to="/payment">
            <Button>Back to payment</Button>
          </Link>
          <Link to="/">
            <Button>Edit subscription plan</Button>
          </Link>
          <Button type={"submit"}>Buy now</Button>
        </div>
      </form>
    </div>
  );
}
