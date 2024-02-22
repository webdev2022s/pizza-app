import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

export default function UpdatingItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(increaseItemQuantity(pizzaId));
  };

  const handleDrecreaseQuantity = () => {
    dispatch(decreaseItemQuantity(pizzaId));
  };
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Button onClick={handleDrecreaseQuantity} type={"rounded"}>
        -
      </Button>
      <p>{currentQuantity}</p>
      <Button onClick={handleIncreaseQuantity} type={"rounded"}>
        +
      </Button>
    </div>
  );
}
