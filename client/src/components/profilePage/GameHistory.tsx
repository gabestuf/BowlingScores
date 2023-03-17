import { FC, useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import Scorecard from "../scorecardPage/Scorecard";
import URL from "../../URLS";
import LoadingDisplay from "../LoadingDisplay";
import DateString from "./DateString";

interface Props {
  gameData: {
    scorecard: number[][];
    frameScores: number[];
    date: Date;
    session: string;
  }[];

  getMatches(): Promise<void>;
}

interface Props2 {
  game: { scorecard: number[][]; frameScores: number[] };
}

const ShowScoreboardToggle: FC<Props2> = ({ game }) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  return (
    <>
      {isToggled ? (
        <Scorecard frameList={game.scorecard} frameScores={game.frameScores} />
      ) : null}
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

const GameHistory: FC<Props> = ({ gameData, getMatches }) => {
  const userInfo = useContext(UserContext);

  async function handleDelete(index: number) {
    try {
      const response = await fetch(URL + "/user/deleteMatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo[0],
          token: userInfo[1],
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
          {gameData.map(
            (
              game: {
                scorecard: number[][];
                frameScores: number[];
                date: Date;
                session: string;
              },
              i
            ) => (
              <tr key={i}>
                <td style={{ fontWeight: "bold" }}>
                  <DateString date={game.date} />
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: ".5rem",
                      flexDirection: "column",
                    }}
                  >
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
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default GameHistory;
