import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate_URL = useNavigate();

  const handleFrom = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate_URL(`/pizza-app/order/${query}`);
    setQuery("");
  };
  return (
    <form
      onSubmit={handleFrom}
      className="m-auto flex items-center justify-center "
    >
      <input
        type="text"
        placeholder="Search order # .."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mr-[-2rem] w-[10rem] rounded-full bg-yellow-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-blue-200 focus:outline-none focus:ring focus:ring-blue-500 sm:ml-[-7rem] sm:w-80 sm:focus:w-96"
      />
      <button>
        <svg className="h-[1rem] w-[1.3rem] fill-sky-500">
          <use xlinkHref="./sprite.svg#icon-magnifying-glass"></use>
        </svg>
      </button>
    </form>
  );
}
