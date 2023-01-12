import { FC, useContext } from "react";
import "./../css/Header.css";
import { NavLink } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie";
import { UserContext } from "../UserContext";

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthCookie: (name: string, value: any, options?: CookieSetOptions | undefined) => void;
}

const Header: FC<Props> = ({ isLoggedIn, setIsLoggedIn, setAuthCookie }) => {
  const username = useContext(UserContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthCookie("user", "");
  };

  return (
    <div className="Header">
      <ul>
        <li>
          <NavLink className="link" to="/">
            Home
          </NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <NavLink className="link" to="/profile">
              Welcome, {username || ""}
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink className="link" to="/signin">
              Sign In
            </NavLink>
          </li>
        )}
        {isLoggedIn ? (
          <li onClick={() => handleLogout()}>
            <NavLink className="link" to="/signin">
              Log Out
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink className="link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
