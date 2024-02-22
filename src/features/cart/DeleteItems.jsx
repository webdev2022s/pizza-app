import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

import Button from "../../ui/Button";

function DeleteItems({ pizzaId }) {
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteItem(pizzaId));
  };

  return (
    <Button onClick={handleDeleteItem} type="deleteB">
      Delete
    </Button>
  );
}

export default DeleteItems;
