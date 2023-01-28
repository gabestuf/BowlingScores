import { useState, useEffect } from "react";
import ScorePage from "./ScorePage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ProfilePage from "./ProfilePage";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useCookies from "react-cookie/cjs/useCookies";
import { UserContext } from "./UserContext.js";
import "./css/App.css";
import URL from "./URLS";

function App() {
  const [username, setUsername] = useState<string | null>(null); // TODO remember to change back to null after testing
  const [authCookie, setAuthCookie, removeAuthCookie] = useCookies();
  const [currentGameCookie, setCurrentGameCookie, removeCurrentGameCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // remember to change back to false after testing
  const [frameList, setFrameList] = useState<Array<Array<number>>>([]);

  // Authenticate on page load
  useEffect(() => {
    authenticate();
  }, []);

  async function authenticate() {
    // Check cookie to see if exists
    if (Object.keys(authCookie).includes("user")) {
      // If so, send id to the server and authenticate
      const userName = authCookie.user.name;
      const id = authCookie.user.id;
      try {
        const response = await fetch(URL + "Auth/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            id: id,
          }),
        });

        const resJSON = await response.json();

        if (resJSON.status === "SUCCESS") {
          // If success, log in user
          setIsLoggedIn(true);
          setUsername(resJSON.username);
        } else {
          console.error(`Error authenticating on client side: ${resJSON.message}`);
        }
      } catch (e) {
        console.error(`There was an error with authentication: ${e}`);
      }
    }
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={username}>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} removeAuthCookie={removeAuthCookie} />
        <Routes>
          <Route path="/" element={<ScorePage currentGameCookie={currentGameCookie} setCurrentGameCookie={setCurrentGameCookie} removeCurrentGameCookie={removeCurrentGameCookie} frameList={frameList} setFrameList={setFrameList} />} />
          <Route path="/signin" element={<LoginPage setAuthCookie={setAuthCookie} setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
