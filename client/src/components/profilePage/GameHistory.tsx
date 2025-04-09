import { FC, useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import Scorecard from "../scorecardPage/Scorecard";
import URL from "../../URLS";
import LoadingDisplay from "../LoadingDisplay";
import DateString from "./DateString";
import { useNavigate } from "react-router-dom";

interface Props {
  gameData: {
    _id: String;
    scorecard: number[][];
    frameScores: number[];
    date: Date;
    session: string;
  }[];

  getMatches(): Promise<void>;
}

const GameHistory: FC<Props> = ({ gameData, getMatches }) => {
  const userInfo = useContext(UserContext);
  const navigate = useNavigate();
  async function handleDelete(gameID: String) {
    try {
      const response = await fetch(URL + "/user/deleteMatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo[0],
          token: userInfo[1],
          gameID: gameID,
        }),
      });

      const res = await response.json();

      if (res.status === "SUCCESS") {
        getMatches();
      } else {
        return alert(res.message);
      }
    } catch (e) {
      alert(`Error finding matches: ${e}`);
      console.error(e);
    }
  }

  function handleGameSelect(_gameId: String) {
    navigate(`/game/${_gameId}`);
  }

  // Return this code if there are no games played
  if (gameData.length === 0) {
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
            <th>Date</th>
            <th>Total</th>
            <th>Session</th>
            <th>Options</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {gameData.map(
            (
              game: {
                scorecard: number[][];
                frameScores: number[];
                date: Date;
                session: string;
                _id: String;
              },
              i
            ) => (
              <tr key={i}>
                <td>
                  <DateString date={game.date} />
                </td>
                <td>
                  <h4>{game.frameScores[game.frameScores.length - 1]}</h4>
                </td>
                <td>{game.session}</td>
                <td>
                  <button
                    className="green-btn"
                    onClick={() => {
                      handleGameSelect(game._id);
                    }}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      handleDelete(game._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default GameHistory;
