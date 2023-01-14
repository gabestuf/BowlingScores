import { FC, useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Scorecard from "./Scorecard";
import URL from "./../URLS";
import LoadingDisplay from "./LoadingDisplay";

interface Props {
  gameData: {
    scorecard: number[][];
    frameScores: number[];
  }[];
  setGameData: React.Dispatch<
    React.SetStateAction<
      {
        scorecard: number[][];
        frameScores: number[];
      }[]
    >
  >;
  getMatches(): Promise<void>;
}

interface Props2 {
  game: { scorecard: number[][]; frameScores: number[] };
}

const ShowScoreboardToggle: FC<Props2> = ({ game }) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  return (
    <>
      {isToggled ? <Scorecard frameList={game.scorecard} frameScores={game.frameScores} /> : null}
      <button
        className="btn"
        onClick={() => {
          setIsToggled(!isToggled);
        }}
      >
        {isToggled ? "Hide" : "Show Scoreboard"}
      </button>
    </>
  );
};

const GameHistory: FC<Props> = ({ gameData, setGameData, getMatches }) => {
  const username = useContext(UserContext);

  async function handleDelete(index: number) {
    try {
      const response = await fetch(URL + "/user/deleteMatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          gameIndex: index,
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
            <th>#</th>
            <th>Scorecard</th>
            <th>Total</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {gameData.map((game: { scorecard: number[][]; frameScores: number[] }, i) => (
            <tr key={i}>
              <td style={{ fontWeight: "bold" }}>{gameData.length - i}</td>
              <td>
                <div style={{ display: "flex", gap: ".5rem", flexDirection: "column" }}>
                  <ShowScoreboardToggle game={game} />
                </div>
              </td>
              <td>{game.frameScores[game.frameScores.length - 1]}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => {
                    handleDelete(gameData.length - i - 1);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GameHistory;
