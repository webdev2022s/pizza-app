import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Menu, { Loader as PizzaMenu } from "./features/menu/Menu";
import Order, { Loader as OrderPizza } from "./features/order/Order";
import CreateOrder, { Action as NewOrder } from "./features/order/CreateOrder";
import { Action as UpdateOrder } from "./features/order/UpdateOrder";
import Cart from "./features/cart/Cart";

import Home from "./ui/Home";
import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: PizzaMenu,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: NewOrder,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: OrderPizza,
        errorElement: <Error />,
        action: UpdateOrder,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
