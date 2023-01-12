import { FC, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Scorecard from "./Scorecard";
import URL from "./../URLS";
interface Props {}

const GameHistory: FC<Props> = () => {
  const username = useContext(UserContext);

  const [matchHistory, setMatchHistory] = useState([]);

  // Retrieve user's games on load
  useEffect(() => {
    getMatches();
  }, []);

  async function getMatches() {
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

      if (res.status === "SUCCESS") {
        setMatchHistory(JSON.parse(res.gameList).reverse());
      } else {
        return alert(res.message);
      }
    } catch (e) {
      alert(`Error finding matches: ${e}`);
      console.error(e);
    }
  }

  // Return this code if there are no games played
  if (matchHistory.length === 0) {
    return (
      <table className="GameHistoryTable">
        <thead>
          <tr>
            <th>No Games Saved</th>
          </tr>
        </thead>
      </table>
    );
  }

  return (
    <>
      <table className="GameHistoryTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Scorecard</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {matchHistory.map((game, i) => (
            <tr key={i}>
              <td style={{ fontWeight: "bold" }}>{matchHistory.length - i}</td>
              <td>
                <Scorecard frameList={game} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GameHistory;
