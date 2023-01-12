import { FC, useState } from "react";
import "./../css/Profile.css";

import GameHistory from "./GameHistory";

interface Props {}

const Profile: FC<Props> = () => {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => {
          setShowHistory(!showHistory);
        }}
      >
        {showHistory ? "Hide Match History" : "Show Match History"}
      </button>
      {showHistory ? <GameHistory /> : null}
    </>
  );
};

export default Profile;
