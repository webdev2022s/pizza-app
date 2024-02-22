import { useNavigate } from "react-router-dom";
import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";

export default function Home() {
  const navigate = useNavigate();
  const username = useSelector((store) => store.user.username);

  return (
    <>
      <div className="my-10 p-4 text-center">
        <h1 className="mb-6 text-xl font-extrabold uppercase md:text-3xl">
          Pizza-App
          <br />
          <span className=" text-lg font-bold text-yellow-600">
            Scaplog Pizza is in the house Order Now!
          </span>
        </h1>
        {username ? (
          <Button type="primary" to={"/pizza-app/menu"}>
            Start Ordering
          </Button>
        ) : (
          <CreateUser />
        )}
      </div>
    </>
  );
}
