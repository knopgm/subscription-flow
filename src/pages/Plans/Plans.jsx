import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

import { useSubscriptionFlow } from "../../utilities/subscription-flow";
import { SubscriptionCard } from "./components/SubscriptionCard";
import { Button } from "../../components/Button";

import styles from "./style.scss";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";

export function Plans() {
  // useHistory is a hook to link the pages
  const history = useHistory();

  // useSubscriptionFlow is a custom hook to deal with data that are
  // fundamental for all pages
  const {
    subscriptionFlowState,
    setPlan,
    setPricingOptions,
  } = useSubscriptionFlow();

  // useForm is a hook to store and validate form data
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      amountGb: subscriptionFlowState.pricingOptions.amountGb,
      upfrontPayment: subscriptionFlowState.pricingOptions.upfrontPayment,
    },
  });

  // useEffect is a hook that I used to deal with the fetch of data only at
  // the first load of the page. use State to store the fetch data
  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("https://cloud-storage-prices-moberries.herokuapp.com/prices")
      .then((res) => res.json())
      .then((result) => {
        setPlans(result.subscription_plans);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // watch is a react function to look dinamicaly for a change on the inputs
  const { amountGb, upfrontPayment } = watch();

  // useState to store the user Plan selections. It has a default Plan setted
  // and is not directly setted to the global store until the user submitted
  const [selectedPlan, setSelectedPlan] = useState({
    packageName: "Business",
    durationMonths: 12,
    priceUsdPerGb: 2,
    id: 2,
  });

  // function to store the selected data which could be temporarely data until
  // the user submit it
  const handlePlanSelect = (data) => {
    setSelectedPlan(data);
  };

  // function to store selected data on the "global" store, after the user
  // decided which plan was the best, and redirecting to step 2 of the subscription
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

  // variables to calculate the sellected plans
  const subtotal =
    amountGb * selectedPlan?.priceUsdPerGb * selectedPlan?.durationMonths;

  const discount = upfrontPayment ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  if (loading) {
    return null;
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Plans}>
        {plans.map((plan, index) => {
          return (
            <SubscriptionCard
              selected={selectedPlan?.id === index}
              durationMonths={plan.duration_months}
              priceUsdPerGb={plan.price_usd_per_gb}
              key={index}
              id={index}
              onSelect={handlePlanSelect}
            />
          );
        })}
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
          <div className={styles.SelectionWrapper}>
            <div className={styles.GbWrapper}>
              <Select
                label="Amount of Gb:"
                options={[{ value: 5 }, { value: 10 }, { value: 50 }]}
              />
            </div>

            <Input
              {...register("upfrontPayment", { required: false })}
              type="checkbox"
              label="Upfront Payment"
            />
          </div>

          <div className={styles.SelectionPrices}>
            <div>Subtotal: ${subtotal}</div>
            <div>Discount: ${discount}</div>
            <div>Total: ${total}</div>

            <Button type="submit">Confirm and go to payment</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
