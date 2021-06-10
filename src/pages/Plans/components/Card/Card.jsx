import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./style.scss";

export function Card({ priceUsdPerGb, durationMonths, onSubmit }) {
  const { register, handleSubmit } = useForm();

  const handleCardSubmit = (data) => {
    const { amountGb } = data;
    onSubmit({ amountGb, durationMonths, priceUsdPerGb });
  };

  return (
    <div className={styles.Card__Wrapper}>
      <div className={styles.Card}>
        <div>Plan {durationMonths} months</div>
        <div>${priceUsdPerGb} per Gb</div>
        <div>Total: ${5 * priceUsdPerGb}</div>

        <form onSubmit={handleSubmit(handleCardSubmit)}>
          <select {...register("amountGb")} defaultValue="5">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
