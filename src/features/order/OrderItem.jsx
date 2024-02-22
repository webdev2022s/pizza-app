import { formatCurrency } from "../../utility/helper";

function OrderItem({ item, ingredients, isIngredientsLoading }) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="space-y-2 py-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-800">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font text-sm font-semibold">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p className="text-xs font-semibold capitalize italic">
        {isIngredientsLoading ? "Loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
