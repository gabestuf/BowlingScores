import { FC, useState, useContext, useEffect } from "react";
import "./../../css/Profile.css";
import { UserContext } from "../../UserContext";
import URL from "../../URLS";
import LoadingDisplay from "../LoadingDisplay";
import GameHistory from "./GameHistory";
import GeneralStats from "./GeneralStats";
import MatchFilterSelect from "./MatchFilter";
import { filterOptions, GameStats } from "./../../Interfaces";

interface Props {}

const Profile: FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [gameData, setGameData] = useState<
    Array<{
      _id: String;
      scorecard: number[][];
      frameScores: number[];
      date: Date;
      session: string;
    }>
  >([]);
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
  const [sessionList, setSessionList] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<filterOptions>({
    session: "all",
    startDate: null,
    endDate: null,
    score: null,
  });

  const userInfo = useContext(UserContext);

  async function getMatches() {
    setLoading(true);
    try {
      const response = await fetch(URL + "/user/getGames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo[0],
          token: userInfo[1],
          filters: filterOptions,
        }),
      });

      const res = await response.json();
      setLoading(false);

      if (res.status === "SUCCESS") {
        // parse res
        for (const game of res.data) {
          game.frameScores = JSON.parse(game.frameScores);
          game.scorecard = JSON.parse(game.scorecard);
        }

        setGameData(res.data.reverse());
      } else {
        alert(res.message);
      }
    } catch (e) {
      alert(`Error finding matches: ${e}`);
      setLoading(false);
      console.error(e);
    }
  }

  // handle filtering
  useEffect(() => {
    getMatches();
  }, [filterOptions.session]);

  // Calculate stats whenever gameData changes
  useEffect(() => {
    setGameStats(calcData());
  }, [gameData]);

  const toggleShowHistory = () => {
    return showHistory ? <GameHistory gameData={gameData} getMatches={getMatches} /> : null;
  };

  // Get match info on page load
  useEffect(() => {
    getMatches();
    getSessions();
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

  const resetFilters = () => {
    setFilterOptions({
      session: "all",
      startDate: null,
      endDate: null,
      score: null,
    });
  };

  const getSessions = async () => {
    const res = await fetch(URL + "/user/getSessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo[0],
        token: userInfo[1],
      }),
    });

    const resJSON = await res.json();
    if (resJSON.status === "SUCCESS") {
      const newSessionList: string[] = JSON.parse(resJSON.sessionList);
      newSessionList.sort((a, b) => a.localeCompare(b));
      newSessionList.unshift("all");
      setSessionList(newSessionList);
    }
  };

  return (
    <div className="App profilePage">
      <MatchFilterSelect sessionList={sessionList} filterOptions={filterOptions} setFilterOptions={setFilterOptions} resetFilters={resetFilters} />
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
