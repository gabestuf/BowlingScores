import { FC, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Scorecard from "./Scorecard";
import axios from "axios";
interface Props {}

const GameHistory: FC<Props> = () => {
  const username = useContext(UserContext);

  const [matchHistory, setMatchHistory] = useState([]);
  const urlWithProxy = "/user/getMatches";

  // Retrieve user's games on load
  useEffect(() => {
    axios
      .post(urlWithProxy, { username: username })
      .then((res) => {
        setMatchHistory(JSON.parse(res.data.gameList).reverse());
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

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
