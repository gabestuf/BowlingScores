import { FC, useContext } from "react";
import URL from "./../URLS";
import { UserContext } from "../UserContext";

interface Props {
  frameList: number[][];
}

const ScorecardOptions: FC<Props> = ({ frameList }) => {
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
          bowlingGame: frameList,
        }),
      });
      const res = await response.json();
      console.log(res);
      if (res.status === "SUCCESS") {
        alert(res.message);
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
      <button onClick={(e) => handleSave(e)}>Save</button>
    </div>
  );
};

export default ScorecardOptions;
