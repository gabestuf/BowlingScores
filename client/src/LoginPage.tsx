import React, { FC, useRef } from "react";
import "./css/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie";
import axios from "axios";

interface Props {
  setAuthCookie: (name: "user", value: any, options?: CookieSetOptions | undefined) => void;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;

  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: FC<Props> = ({ setIsLoggedIn, setAuthCookie, setUsername }) => {
  const navigate = useNavigate();
  const usernameElement = useRef(document.createElement("input"));
  const passwordElement = useRef(document.createElement("input"));

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username: string = usernameElement.current.value;
    const password: string = passwordElement.current.value;

    try {
      const response = await axios.post("/user/signin", { username: username, password: password });
      const res = response.data;
      // console.log(res);
      if (res.status === "SUCCESS") {
        setUsername(res.username);
        const uuid = crypto.randomUUID();
        setIsLoggedIn(true);
        setAuthCookie("user", uuid, { maxAge: 3600 });
        navigate("/");
      } else {
        return alert(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="loginPage">
      <form className="LoginForm" onSubmit={(e) => submitFormHandler(e)}>
        <label htmlFor="username">Username</label>

        <input ref={usernameElement} type="text" name="username" id="username" required />
        <label htmlFor="password">Password</label>

        <input ref={passwordElement} type="password" name="password" id="password" required />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
