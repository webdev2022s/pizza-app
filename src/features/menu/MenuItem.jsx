import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";

import Button from "../../ui/Button";
import { formatCurrency } from "../../utility/helper";
import DeleteItems from "../cart/DeleteItems";
import UpdatingItemQuantity from "../cart/UpdatingItemQuantity";

function MenuItem({ pizza }) {
  const { imageUrl, ingredients, name, unitPrice, soldOut, id } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isNotEmpty = currentQuantity > 0;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? " grayscale" : ""}  `}
      />
      <div className="flex grow flex-col">
        <p className="font-bold">{name}</p>
        <p className="text-sm font-normal capitalize text-stone-500">
          {ingredients.join(" ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm font-medium">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold Out
            </p>
          )}
          {isNotEmpty && (
            <>
              <div className="flex gap-1 md:gap-2">
                <UpdatingItemQuantity
                  pizzaId={id}
                  currentQuantity={currentQuantity}
                />
                <DeleteItems pizzaId={id} />
              </div>
            </>
          )}
          {!soldOut && !isNotEmpty && (
            <Button type="base" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
