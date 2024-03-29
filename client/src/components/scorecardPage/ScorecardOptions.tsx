import { FC, useContext } from "react";
import URL from "./../../URLS";
import { UserContext } from "./../../UserContext";

interface Props {
  frameList: number[][];
  frameScores: number[];
  resetGame: () => void;
  bowlingSession: string;
}

const ScorecardOptions: FC<Props> = ({ frameList, frameScores, resetGame, bowlingSession }) => {
  const userInfo = useContext(UserContext);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (userInfo[0] === null) {
      return alert("Please sign in to save games :)");
    }

    try {
      const response = await fetch(URL + "/user/saveScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo[0],
          bowlingGame: {
            scorecard: frameList,
            frameScores: frameScores,
            date: new Date(),
            session: bowlingSession,
          },
        }),
      });
      const res = await response.json();
      if (res.status === "SUCCESS") {
        alert(res.message);
        resetGame();
      } else {
        alert("Error saving game: " + res.message);
      }
    } catch (e) {
      alert(`Error saving game: ${e}`);
      console.error(e);
    }
  };

  return (
    <div className="ScorecardOptions">
      <button className="btn" onClick={(e) => handleSave(e)}>
        Save
      </button>
    </div>
  );
};

export default ScorecardOptions;
