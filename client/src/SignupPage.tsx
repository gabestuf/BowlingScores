import React, { FC, useRef, useState } from "react";
import "./css/LoginForm.css";
import { useNavigate } from "react-router-dom";
import URL from "./URLS";
import LoadingDisplay from "./components/LoadingDisplay";

interface Props {}

const LoginPage: FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const usernameElement = useRef(document.createElement("input"));
  const passwordElement = useRef(document.createElement("input"));
  const passwordElement2 = useRef(document.createElement("input"));

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let username: string = usernameElement.current.value;
    let password: string = passwordElement.current.value;
    let password2: string = passwordElement2.current.value;

    if (password !== password2) {
      passwordElement2.current.value = "";
      return alert("Passwords don't match!");
    }
    setLoading(true);

    try {
      const response = await fetch(URL + "/user/signup", {
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
        alert("Signup Successful");
        navigate("/signin");
      } else {
        return alert(res.message);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      return alert(`Signup failed: ${e}`);
    }
  };

  return (
    <div className="App loginPage">
      <form className="LoginForm" onSubmit={(e) => submitFormHandler(e)}>
        <label htmlFor="username">Username</label>
        <input ref={usernameElement} type="text" name="username" id="username" required />
        <label htmlFor="password">Password</label>
        <input ref={passwordElement} type="password" name="password" id="password" required />
        <label htmlFor="password2">Confirm Password</label>
        <input ref={passwordElement2} type="password" name="password2" id="password2" required />
        <button className="btn">Submit</button>
      </form>
      {loading ? <LoadingDisplay /> : <></>}
    </div>
  );
};

export default LoginPage;
