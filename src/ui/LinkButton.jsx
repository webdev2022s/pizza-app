import { Link, useNavigate } from "react-router-dom";

export default function LinkButton({ children, to }) {
  const backNavigate = useNavigate();
  const className = "text-sky-500 hover:text-sky-900 hover:underline";
  if (to === "-1")
    return (
      <button className={className} onClick={() => backNavigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
