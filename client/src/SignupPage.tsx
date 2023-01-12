import React, { FC, useRef } from "react";
import "./css/LoginForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {}

const LoginPage: FC<Props> = () => {
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

    try {
      const response = await axios.post("/user/signup", { username: username, password: password });
      const res = response.data;

      if (res.status === "SUCCESS") {
        alert("Signup Successful");
        navigate("/signin");
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
        <label htmlFor="password2">Confirm Password</label>
        <input ref={passwordElement2} type="password" name="password2" id="password2" required />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
