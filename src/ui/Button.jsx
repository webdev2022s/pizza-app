import { Link } from "react-router-dom";

export default function Button({ children, disable, to, type, onClick }) {
  const className =
    "rounded-full bg-yellow-500 text-sm font-bold uppercase tracking-wide text-stone-950 shadow-lg shadow-indigo-500  transition-colors hover:bg-lime-300 hover:ring hover:ring-lime-300 hover:ring-offset-2 focus:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 active:bg-lime-500 active:ring active:ring-lime-500 ";

  const style = {
    primary: className + "px-4 py-4 md:px-6 md:py-4",
    base: className + "p-2 md:px-4 md:py-2.5 text-xs",
    rounded: className + "px-3 py-2 md:px-3 md:py-2 text-xs ",
    deleteB:
      "p-2 md:px-4 md:py-2.5 text-xs rounded-full bg-yellow-500  font-bold uppercase tracking-wide text-stone-950 shadow-lg shadow-indigo-500  transition-colors hover:bg-red-600 hover:ring hover:ring-red-500 hover:ring-offset-2 focus:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 active:bg-lime-500 active:ring active:ring-lime-500 ",
    clearB:
      "border text-sm border-stone-500 px-4 py-4 md:px-6 md:py-4 rounded-full  font-bold uppercase tracking-wide text-stone-400 hover:text-stone-950 shadow-lg shadow-indigo-500  transition-colors hover:bg-stone-700 hover:ring hover:ring-stone-700 hover:ring-offset-2 focus:bg-stone-500 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-offset-2 active:bg-lime-500 active:ring active:ring-lime-500 ",
  };

  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disable} className={style[type]} onClick={onClick}>
        {children}
      </button>
    );
  return (
    <button disabled={disable} className={style[type]}>
      {children}
    </button>
  );
}
