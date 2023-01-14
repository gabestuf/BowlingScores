import { FC, useContext } from "react";
import URL from "./../URLS";
import { UserContext } from "../UserContext";

interface Props {
  frameList: number[][];
  frameScores: number[];
  resetGame: () => void;
}

const ScorecardOptions: FC<Props> = ({ frameList, frameScores, resetGame }) => {
  const username = useContext(UserContext);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (username === null) {
      return alert("Please sign in to save games :)");
    }

    try {
      const response = await fetch(URL + "/user/saveScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          bowlingGame: {
            scorecard: frameList,
            frameScores: frameScores,
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
