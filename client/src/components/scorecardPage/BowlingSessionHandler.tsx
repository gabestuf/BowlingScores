import React, { FC, useContext, useEffect, useRef, useState } from "react";
import URL from "../../URLS";
import { UserContext } from "../../UserContext";
import "./../../css/DropDown.css";

interface Props {
  setCurrentSession: React.Dispatch<React.SetStateAction<string>>;
  currentSession: string;
}

const BowlingSessionHandler: FC<Props> = ({ setCurrentSession, currentSession }) => {
  const userInfo = useContext(UserContext);
  const [sessionList, setSessionList] = useState<string[]>(["default"]);

  useEffect(() => {
    getSessions();
  }, [userInfo]);

  useEffect(() => {
    const currentSessionData = window.localStorage.getItem("currentSession");
    if (currentSessionData !== null && currentSessionData !== undefined) {
      setCurrentSession(currentSessionData);
    }
  }, []);

  const getSessions = async () => {
    const res = await fetch(URL + "/user/getSessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo[0],
        token: userInfo[1],
      }),
    });

    const resJSON = await res.json();
    if (resJSON.status === "SUCCESS") {
      setSessionList(JSON.parse(resJSON.sessionList));
    }
  };

  const handleAddNewSession = async () => {
    if (userInfo[0] === "" || userInfo[1] === "") {
      alert("You must be logged in to create a session");
      return;
    }
    const prompt_result = prompt("New Session Name");
    if (prompt_result === null) return;

    //Make sure within bounds
    if (prompt_result.length < 1 || prompt_result.length > 25) {
      alert("Sorry, the name of your session must be between 1 & 25 characters.");
      return;
    }

    // finally, save the new session name
    const res = await fetch(URL + "/user/addSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo[0],
        token: userInfo[1],
        sessionName: prompt_result,
      }),
    });
    const resJSON = await res.json();

    if (resJSON.status === "FAILED") {
      const str = `Error: ${resJSON.message}`;
      alert(str);
    }
    if (resJSON.status === "SUCCESS") {
      getSessions();
      updateCurrentSession(prompt_result);

      console.log("Success saving session name!");
    }
  };

  function updateCurrentSession(sessionName: string) {
    setCurrentSession(sessionName);
    window.localStorage.setItem("currentSession", sessionName);
  }

  const handleDeleteCurrentSession = async () => {
    if (userInfo[0] === "" || userInfo[1] === "") {
      alert("You must be logged in to delete a session");
      return;
    }

    if (currentSession === "default") {
      alert("Cannot delete default session");
      return;
    }

    // finally, save the new session name
    const res = await fetch(URL + "/user/deleteSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo[0],
        token: userInfo[1],
        sessionName: currentSession,
      }),
    });
    const resJSON = await res.json();

    if (resJSON.status === "FAILED") {
      const str = `Error: ${resJSON.message}`;
      alert(str);
    }
    if (resJSON.status === "SUCCESS") {
      getSessions();
      console.log("deleted session");
    }
  };

  return (
    <>
      <div className="container">
        <label htmlFor="currentSession">Current Session:</label>

        <select
          name="currentSession"
          id="currentSession"
          onChange={(e) => {
            updateCurrentSession(e.target.value);
          }}
          value={currentSession}
        >
          {sessionList.map((name, i) => (
            <option className="sessionOption" key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={() => handleAddNewSession()}>New Session</button>
      <button onClick={() => handleDeleteCurrentSession()}>Delete Current Session</button>
    </>
  );
};

export default BowlingSessionHandler;
