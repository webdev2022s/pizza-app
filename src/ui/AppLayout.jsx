import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

export default function AppLayout() {
  const navigate = useNavigation(); //state of state

  const load = navigate.state === "loading";

  return (
    <>
      {load && <Loader />}
      <div className="grid h-screen grid-rows-[auto_1fr_auto]">
        {" "}
        <Header />
        <div className="overflow-y-auto overflow-x-hidden">
          <main className="mx-auto max-w-3xl">
            <Outlet />
          </main>
        </div>
        <CartOverview />
      </div>
    </>
  );
}
