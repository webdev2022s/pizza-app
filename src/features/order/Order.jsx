import { useFetcher, useLoaderData } from "react-router-dom"; //custom hook for calling API

import { getOrder } from "../../services/apiPizzaMenu";
import {
  calcMinuteleft,
  formatCurrency,
  formatDate,
} from "../../utility/helper";

import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinuteleft(estimatedDelivery);

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  return (
    <div className="mt-5 space-y-8 bg-stone-50 px-4 py-6 shadow-xl shadow-yellow-400/80 ">
      <div className="  flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              {" "}
              Priority{" "}
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm uppercase text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-300 px-3 py-5">
        <p className="font-semibold text-stone-900 ">
          {deliveryIn >= 0
            ? `Only ${calcMinuteleft(estimatedDelivery)} minutes left 🌝`
            : "Order should have arrived"}{" "}
        </p>
        <p className="text-sm text-stone-800">
          (Estimated delivery: {formatDate(estimatedDelivery)} )
        </p>
      </div>

      <ul className="divide-y divide-stone-300 border-b border-t border-b-stone-300 px-3 py-5">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.name}
            isIngredientsLoading={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-300 px-3 py-5">
        <div className="flex items-center justify-between">
          <p className="text-sm  text-stone-800">Price pizza:</p>
          <p className="text-sm  text-stone-800">
            {" "}
            {formatCurrency(orderPrice)}
          </p>
        </div>

        <div className=" flex items-center justify-between">
          {priority && (
            <>
              <p className="text-sm text-stone-800">Price priority:</p>
              <p className="text-sm text-stone-800">
                {" "}
                {formatCurrency(priorityPrice)}{" "}
              </p>
            </>
          )}
        </div>

        <div className=" flex items-center justify-between border-t border-t-stone-50 ">
          <p className=" mt-2 text-lg font-extrabold text-stone-800">
            To pay on delivery:
          </p>
          <p className="mt-2 text-lg font-extrabold text-stone-800">
            {formatCurrency(orderPrice + priorityPrice)}
          </p>
        </div>
      </div>
      <div className="text-right">{!priority && <UpdateOrder />}</div>
    </div>
  );
}

export async function Loader({ params }) {
  const order = await getOrder(params.orderId); //params for id query fetching

  return order;
}

export default Order;
