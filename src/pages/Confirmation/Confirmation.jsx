import React from "react";
import { Link } from "react-router-dom";
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
    <Container>
      <div className={styles.Confirmation_Wrapper}>
        <div> Selected Plan </div>
        <div> Selected Gigabytes </div>
        <div> Included Total Price and Price Per Gigabyte</div>
        <Link to="/payment">
          <button>Edit Payment Method</button>
        </Link>
        <Link to="/">
          <button>Edit Subscription Plan</button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              value: subscriptionFlowState.user?.email,
            })}
            label="Email Contact"
            type="string"
          />
          {errors.email?.type === "required" && "Email contact is required"}
          {errors.email?.type === "pattern" &&
            "Email contact format is invalid"}
          <Input
            {...register("tosAccept", { required: true })}
            label="Accept Terms of Service"
            type="checkbox"
          />
          {errors.tosAccept?.type === "required" &&
            "Accepting terms of service is required"}
          <input type="submit" />
        </form>
      </div>
    </Container>
  );
}
