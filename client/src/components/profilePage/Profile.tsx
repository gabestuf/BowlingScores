import { FC, useState, useContext, useEffect } from "react";
import "./../../css/Profile.css";
import { UserContext } from "../../UserContext";
import URL from "../../URLS";
import LoadingDisplay from "../LoadingDisplay";
import GameHistory from "./GameHistory";
import GeneralStats from "./GeneralStats";

interface Props {}

interface GameStats {
  totalAvg: number;
  currentPeriodAvg: number;
  previousPeriodAvg: number;
  totalFirstShotPinAvg: number;
  currentFirstShotPinAvg: number;
  previousFirstShotPinAvg: number;
  totalStrikesPerGameAvg: number;
  currentStrikesPerGameAvg: number;
  previousStrikesPerGameAvg: number;
  totalOpenFrameCountAvg: number;
  currentOpenFrameCountAvg: number;
  previousOpenFrameCountAvg: number;
  totalNumGames: number;
  totalSpareConversionPercentage: number;
}

const Profile: FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [gameData, setGameData] = useState<Array<{ scorecard: number[][]; frameScores: number[]; date: Date }>>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    totalAvg: 0,
    currentPeriodAvg: 0,
    previousPeriodAvg: 0,
    totalFirstShotPinAvg: 0,
    currentFirstShotPinAvg: 0,
    previousFirstShotPinAvg: 0,
    totalStrikesPerGameAvg: 0,
    currentStrikesPerGameAvg: 0,
    previousStrikesPerGameAvg: 0,
    totalOpenFrameCountAvg: 0,
    currentOpenFrameCountAvg: 0,
    previousOpenFrameCountAvg: 0,
    totalNumGames: 0,
    totalSpareConversionPercentage: 0,
  });

  const userInfo = useContext(UserContext);

  async function getMatches() {
    setLoading(true);
    try {
      const response = await fetch(URL + "/user/getStats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo[0],
          token: userInfo[1],
        }),
      });

      const res = await response.json();
      setLoading(false);

      if (res.status === "SUCCESS") {
        setGameData(JSON.parse(res.gameData).reverse());
      } else {
        alert(res.message);
      }
    } catch (e) {
      alert(`Error finding matches: ${e}`);
      setLoading(false);
      console.error(e);
    }
  }

  useEffect(() => {
    setGameStats(calcData());
  }, [gameData]);

  const toggleShowHistory = () => {
    return showHistory ? <GameHistory gameData={gameData} getMatches={getMatches} /> : null;
  };

  // Get match info on page load
  useEffect(() => {
    getMatches();
  }, []);

  function calcData() {
    const stats = {
      totalAvg: 0,
      currentPeriodAvg: 0,
      previousPeriodAvg: 0,
      totalFirstShotPinAvg: 0,
      currentFirstShotPinAvg: 0,
      previousFirstShotPinAvg: 0,
      totalStrikesPerGameAvg: 0,
      currentStrikesPerGameAvg: 0,
      previousStrikesPerGameAvg: 0,
      totalOpenFrameCountAvg: 0,
      currentOpenFrameCountAvg: 0,
      previousOpenFrameCountAvg: 0,
      totalNumGames: gameData.length,
      totalSpareConversionPercentage: 0,
    };
    for (const game of gameData) {
      stats.totalAvg += game.frameScores[9];

      let totalFirstShotScore: number = 0;
      let strikeCount = 0;
      let openFrameCount = 0;
      for (const frame of game.scorecard) {
        //   stats.totalFirstShotPinAvg
        totalFirstShotScore += frame[0];
        // total Strikes per game
        for (const bowl of frame) {
          if (bowl === 10) {
            strikeCount++;
          }
        }
        // Count open frames
        if (frame[0] !== 10 || frame[0] + frame[1] !== 10) {
          openFrameCount++;
        }
      }
      stats.totalFirstShotPinAvg += totalFirstShotScore / 10;
      stats.totalStrikesPerGameAvg += strikeCount;
      stats.totalOpenFrameCountAvg += openFrameCount;
    }
    // set avg
    stats.totalAvg = Math.round((stats.totalAvg / gameData.length) * 10) / 10;
    stats.totalFirstShotPinAvg = Math.round((stats.totalFirstShotPinAvg / gameData.length) * 10) / 10;
    stats.totalStrikesPerGameAvg = Math.round((stats.totalStrikesPerGameAvg / gameData.length) * 10) / 10;
    stats.totalOpenFrameCountAvg = Math.round((stats.totalOpenFrameCountAvg / gameData.length) * 10) / 10;

    return stats;
  }

  return (
    <div className="App profilePage">
      <GeneralStats totalAvg={gameStats.totalAvg} totalNumGames={gameStats.totalNumGames} totalFirstShotPinAvg={gameStats.totalFirstShotPinAvg} totalStrikesPerGameAvg={gameStats.totalStrikesPerGameAvg} totalOpenFrameCountAvg={gameStats.totalOpenFrameCountAvg} />
      <button
        className="btn"
        onClick={() => {
          setShowHistory(!showHistory);
        }}
      >
        {showHistory ? "Hide Match History" : "Show Match History"}
      </button>

      {loading ? <LoadingDisplay /> : toggleShowHistory()}
    </div>
  );
};

export default Profile;
