import { useDispatch, useSelector } from "react-redux";
import { getUsername } from "../user/userSlice";
import { clearCart, getSummaryOrder } from "./cartSlice";

import CartItem from "../cart/CartItem";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getSummaryOrder);
  const username = useSelector(getUsername);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="p-2">
      <LinkButton to="/menu">&larr; Bact to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">
        Your cart, <span className="capitalize">{username}</span>
      </h2>
      <ul className=" divide-y divide-yellow-600 border-b border-b-yellow-600 p-2">
        {cart.map((item) => (
          <CartItem item={item} key={item.name} />
        ))}
      </ul>
      <div className="mt-8 space-x-5">
        <Button type="primary" to={"/order/new"}>
          Order Pizza
        </Button>
        <Button onClick={handleClearCart} type={"clearB"}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
