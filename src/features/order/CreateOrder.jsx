import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiPizzaMenu";

import { useDispatch, useSelector } from "react-redux";
import { clearCart, getSummaryOrder, getTotalPrice } from "../cart/cartSlice";

import store from "../../services/store"; //just to clear the cart after the order has been made do not overuse it

import { useState } from "react";
import { formatCurrency } from "../../utility/helper";

import { fetchAddress, getAllData } from "../user/userSlice";

import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const handlePriority = (e) => setWithPriority(e.target.checked);

  const navigate = useNavigation(); // feature of react router status
  const isSubmitting = navigate.state === "submitting"; // feature of react router status

  const { username, status, position, address, error } =
    useSelector(getAllData);

  const isLoading = status === "loading";
  const dispatch = useDispatch();

  const cart = useSelector(getSummaryOrder);
  const totalPrice = useSelector(getTotalPrice);
  const priority = withPriority
    ? Math.round(totalPrice * 0.2 + totalPrice)
    : totalPrice;

  const formErrors = useActionData(); // custom hook for handling form errors

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        {" "}
        {/**alternative for this Form method="POST" action"/order/new" */}
        <div className="sm: mb-5  flex flex-col sm:flex-row sm:items-center">
          <label htmlFor="" className="sm:basis-40">
            First Name:
          </label>
          <input
            type="text"
            name="customer"
            required
            className="inputs grow"
            defaultValue={username}
          />
        </div>
        <div className="sm: mb-5  flex flex-col sm:flex-row sm:items-center">
          <label htmlFor="" className="sm:basis-40">
            Phone Number:
          </label>
          <div className="grow">
            <input type="tel" name="phone" className="inputs w-full" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs italic text-red-600">
                {" "}
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="sm: relative  mb-5 flex flex-col sm:flex-row sm:items-center">
          <label htmlFor="" className="sm:basis-40">
            Address:
          </label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="inputs w-full"
              defaultValue={address}
              disabled={isLoading}
              required
            />
            {!position.latitude && !position.longtitude && (
              <button
                disabled={isLoading}
                className="absolute ml-[-2.5rem] mt-[.4rem] md:ml-[-2.5rem] md:mt-[.5rem] "
                onClick={() => dispatch(fetchAddress())}
              >
                <svg className="h-[1.5rem] w-[1.3rem] fill-sky-500">
                  {" "}
                  <use xlinkHref="./sprite.svg#icon-location"></use>
                </svg>
              </button>
            )}
            {error && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs italic text-red-600">
                {" "}
                {error}
              </p>
            )}
          </div>
        </div>
        <div className="mb-10 flex items-center gap-5 font-medium">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-1"
            value={withPriority}
            onChange={handlePriority}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>
        <div className="flex justify-end">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude} , ${position.longitude}`
                : ""
            }
          />
          <Button type={"base"} disabled={isSubmitting || isLoading}>
            {isSubmitting
              ? "Placing Order ..."
              : `"Order now total of:" ${formatCurrency(priority)}`}{" "}
            &rarr;
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function Action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  //Error  Handler
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please Place a Valid Phone number Thank You! ";

  if (Object.keys(errors).length > 0) return errors;

  //it will execute only if there no problem exist
  const newOrder = await createOrder(order);

  store.dispatch(clearCart()); //just to clear the cart after the order has been made do not overuse it

  return redirect(`/pizza-app/order/${newOrder.id}`);
}

export default CreateOrder;
