import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateName } from "./userSlice";

import { useState } from "react";

import Button from "../../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState({ name: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForm = (e) => {
    if (!username.name) return;
    dispatch(updateName(username.name));
    navigate("/menu");
    e.preventDefault();
  };

  return (
    <>
      <form action="" onSubmit={handleForm}>
        <p className="mb-4 text-sm text-stone-600 md:text-base">
          👋 Welcome! Please start by telling us your name:
        </p>

        <input
          type="text"
          placeholder="Your full name..."
          value={username.name}
          name="name"
          onChange={(e) =>
            setUsername((data) => ({
              ...data,
              [e.target.name]: e.target.value,
            }))
          }
          className="inputs mb-8 w-52 sm:w-72"
        />

        {username.name !== "" && (
          <div>
            <Button type="primary">Start Ordering</Button>
          </div>
        )}
      </form>
    </>
  );
}

export default CreateUser;
