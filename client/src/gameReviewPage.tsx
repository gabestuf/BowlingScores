import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL from "./URLS";
import ReviewScorePage from "./components/scorecardPage/ReviewScorePage";

interface Props {
  isLoggedIn: boolean;
}

interface GameData {
  gameID: String;
  userID: String;
  scorecard: number[][];
  frameScores: number[];
  date: Date;
  session: String;
  username: String;
}

const GameReviewPage: FC<Props> = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [gameData, setGameData] = useState<GameData>({
    gameID: "0",
    userID: "0",
    scorecard: [[]],
    frameScores: [],
    date: new Date(),
    session: "error",
    username: "error",
  });
  let { id } = useParams();
  const navigate = useNavigate();

  async function getGame() {
    setPageLoading(true);

    // fetch game from given id
    const response = await fetch(`${URL}/user/getGame/${id}`);
    const resJSON = await response.json();

    if (resJSON.status === "SUCCESS") {
      const newData: GameData = {
        gameID: resJSON.data._id,
        userID: resJSON.data.userID,
        scorecard: JSON.parse(resJSON.data.scorecard),
        frameScores: JSON.parse(resJSON.data.frameScores),
        date: new Date(resJSON.data.date),
        session: resJSON.data.session,
        username: resJSON.data.username,
      };

      setGameData(newData);
    }
    if (resJSON.status === "FAILED") {
      navigate("/404");
    }
  }

  useEffect(() => {
    getGame();
    setPageLoading(false);
  }, []);

  if (!pageLoading) {
    return (
      <>
        <div className="container">
          <h2>{gameData.username}</h2>
          <br />
          <h3>session: {gameData.session}</h3>
          <br />
          <h5>{`${gameData.date.getMonth()}/${gameData.date.getDate()}/${gameData.date.getFullYear()}  ${gameData.date.getHours()}:${gameData.date.getMinutes() - 10 < 0 ? `0${gameData.date.getMinutes()}` : gameData.date.getMinutes()}`}</h5>
          <br />
        </div>
        <ReviewScorePage frameList={gameData.scorecard} frameScores={gameData.frameScores} />
      </>
    );
  } else {
    return <h2 className="GameReviewPage">Loading...</h2>;
  }
};

export default GameReviewPage;
