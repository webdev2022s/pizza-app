import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utility/helper";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";

function CartOverview() {
  const quantity = useSelector(getTotalQuantity);
  const total = useSelector(getTotalPrice);

  if (!total) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-2 text-sm uppercase text-stone-300 sm:p-4 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300">
        <span> {quantity} Pizzas</span>
        <span>{formatCurrency(total)}</span>
      </p>
      <Link to="/cart">Open Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
