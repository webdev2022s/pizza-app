import { useSelector } from "react-redux";

export default function Username() {
  const username = useSelector((store) => store.user.username);
  if (!username) return null;
  return (
    <div className="hidden text-sm font-extrabold md:block ">
      <p>{username}</p>
    </div>
  );
}
