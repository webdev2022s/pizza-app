import { Link } from "react-router-dom";
import SearchOrder from "./SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="align-center flex items-center  justify-between border-b border-stone-500 bg-yellow-500 px-5 py-2 uppercase sm:p-4">
      {" "}
      <Link to="/" className="tracking-[.35em]">
        <h1 className="font-extrabold">Pizza App Co.</h1>
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
