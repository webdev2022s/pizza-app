import { useLoaderData } from "react-router-dom"; // custoom hook calling menu API
import { getPizzaMenu } from "../../services/apiPizzaMenu";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <div>
      <h1 className="text-center font-extrabold uppercase">Menu </h1>

      <ul className="divide-y divide-orange-400 px-2">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  );
}

export async function Loader() {
  const menu = await getPizzaMenu();
  return menu;
}

export default Menu;
