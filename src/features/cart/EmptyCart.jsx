import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-5">
      <LinkButton to={"/pizza-app/menu"}> &larr; Back to menu</LinkButton>

      <p className="my-5 rounded-lg bg-yellow-300 p-5 text-center text-2xl font-extrabold">
        Your cart is still empty. Start adding some pizza :)
      </p>
    </div>
  );
}

export default EmptyCart;
