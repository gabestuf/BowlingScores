import React, { FC, useState, useRef } from "react";
import "./css/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie";
import URL from "./URLS";
import LoadingDisplay from "./components/LoadingDisplay";

interface Props {
  setAuthCookie: (name: "user", value: any, options?: CookieSetOptions | undefined) => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: FC<Props> = ({ setIsLoggedIn, setAuthCookie, setUsername }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const usernameElement = useRef(document.createElement("input"));
  const passwordElement = useRef(document.createElement("input"));

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username: string = usernameElement.current.value;
    const password: string = passwordElement.current.value;
    setLoading(true);
    try {
      const response = await fetch(URL + "/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const res = await response.json();

      setLoading(false);

      if (res.status === "SUCCESS") {
        setUsername(res.username);
        const uuid = crypto.randomUUID();
        setIsLoggedIn(true);
        setAuthCookie(
          "user",
          {
            name: res.username,
            id: uuid,
          },
          { maxAge: 3600 } // in seconds
        );

        saveAuth(res.username, uuid);

        navigate("/");
      } else {
        return alert(res.message);
      }
    } catch (e) {
      setLoading(false);
      alert(`Error logging in ${e}`);
      console.error(e);
    }
  };

  return (
    <div className="App loginPage">
      <form className="LoginForm" onSubmit={(e) => submitFormHandler(e)}>
        <label htmlFor="username">Username</label>

        <input ref={usernameElement} type="text" name="username" id="username" required />
        <label htmlFor="password">Password</label>

        <input ref={passwordElement} type="password" name="password" id="password" required />
        <button className="btn">Submit</button>
      </form>

      {loading ? <LoadingDisplay /> : null}
    </div>
  );
};

async function saveAuth(username: string, id: string) {
  const response = await fetch(URL + "Auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      id: id,
    }),
  });

  const resJSON = await response.json();

  console.log(resJSON);
}

export default LoginPage;
