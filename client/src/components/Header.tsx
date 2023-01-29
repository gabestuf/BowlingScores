import { FC, useContext } from "react";
import "./../css/Header.css";
import { NavLink, useLocation } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie";
import { UserContext } from "../UserContext";

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  removeAuthCookie: (name: string, options?: CookieSetOptions | undefined) => void;
}

const Header: FC<Props> = ({ isLoggedIn, setIsLoggedIn, removeAuthCookie }) => {
  const userInfo = useContext(UserContext);
  let location: string = useLocation().pathname;

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeAuthCookie("user");
  };

  return (
    <div className="Header">
      <ul>
        <li>
          {(() => {
            switch (location) {
              case "/":
                return (
                  <NavLink className="link" to="/profile">
                    Profile
                  </NavLink>
                );
              default:
                return (
                  <NavLink className="link" to="/">
                    Home
                  </NavLink>
                );
            }
          })()}
        </li>
        {isLoggedIn ? (
          <li>
            <NavLink className="link" to="/profile">
              Welcome, {userInfo[0] || ""}
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
