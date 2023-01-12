import { FC, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

interface Props {
  frameList: number[][];
}

const ScorecardOptions: FC<Props> = ({ frameList }) => {
  const username = useContext(UserContext);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (username === null) {
      return alert("Please sign in to save games :)");
    }

    axios
      .post("/user/saveScore", { username: username, bowlingGame: frameList })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="ScorecardOptions">
      <button onClick={(e) => handleSave(e)}>Save</button>
    </div>
  );
};

export default ScorecardOptions;
