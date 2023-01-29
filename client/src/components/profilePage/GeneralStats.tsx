import { FC, useState, useContext, useEffect } from "react";
import "./../../css/Profile.css";
import { UserContext } from "../../UserContext";
import URL from "../../URLS";
import LoadingDisplay from "../LoadingDisplay";
import GameHistory from "./GameHistory";

interface Props {
  totalAvg: number;
  totalNumGames: number;
  totalFirstShotPinAvg: number;
  totalStrikesPerGameAvg: number;
  totalOpenFrameCountAvg: number;
}

const GeneralStats: FC<Props> = ({ totalAvg, totalNumGames, totalFirstShotPinAvg, totalStrikesPerGameAvg, totalOpenFrameCountAvg }) => {
  const userInfo = useContext(UserContext);

  return (
    <div className="GeneralStats">
      <p>Stats over {totalNumGames} games:</p>
      <p>Average: {Number.isNaN(totalAvg) ? "-" : totalAvg}</p>
      <p>Average first shot score: {Number.isNaN(totalFirstShotPinAvg) ? "-" : totalFirstShotPinAvg}</p>
      <p>Average Strikes / game: {Number.isNaN(totalStrikesPerGameAvg) ? "-" : totalStrikesPerGameAvg}</p>
      <p>Average Open frames / game: {Number.isNaN(totalOpenFrameCountAvg) ? "-" : totalOpenFrameCountAvg}</p>
    </div>
  );
};

export default GeneralStats;
