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

function App() {
  const [username, setUsername] = useState<string | null>(null); // TODO remember to change back to null after testing
  const [authCookie, setAuthCookie, removeAuthCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // remember to change back to false after testing
  const [frameList, setFrameList] = useState<Array<Array<number>>>([]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={username}>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setAuthCookie={setAuthCookie} />
        <Routes>
          <Route path="/" element={<ScorePage frameList={frameList} setFrameList={setFrameList} />} />
          <Route path="/signin" element={<LoginPage setAuthCookie={setAuthCookie} setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
