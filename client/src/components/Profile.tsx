import { FC, useState, useContext } from "react";
import "./../css/Profile.css";
import { UserContext } from "../UserContext";
import URL from "../URLS";
import LoadingDisplay from "./LoadingDisplay";
import GameHistory from "./GameHistory";

interface Props {}

const Profile: FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [gameData, setGameData] = useState<Array<{ scorecard: number[][]; frameScores: number[] }>>([]);

  const username = useContext(UserContext);

  async function getMatches() {
    setLoading(true);
    try {
      const response = await fetch(URL + "/user/getMatches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      });

      const res = await response.json();
      setLoading(false);

      if (res.status === "SUCCESS") {
        setGameData(JSON.parse(res.gameData).reverse());
      } else {
        alert(res.message);
      }
    } catch (e) {
      alert(`Error finding matches: ${e}`);
      setLoading(false);
      console.error(e);
    }
  }

  const toggleShowHistory = () => {
    return showHistory ? <GameHistory gameData={gameData} getMatches={getMatches} setGameData={setGameData} /> : null;
  };

  return (
    <div className="App profilePage">
      <button
        className="btn"
        onClick={() => {
          setShowHistory(!showHistory);
          if (!showHistory) {
            getMatches();
          }
        }}
      >
        {showHistory ? "Hide Match History" : "Show Match History"}
      </button>

      {loading ? <LoadingDisplay /> : toggleShowHistory()}
    </div>
  );
};

export default Profile;
