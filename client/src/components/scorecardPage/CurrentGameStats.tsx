import { FC } from "react";
import "./../../css/CurrentGameStats.css";

interface Props {
  frameScores: number[];
  maxScore: number;
}

const CurrentGameStats: FC<Props> = ({ frameScores, maxScore }) => {
  return (
    <table className="CurrentGameStats">
      <thead>
        <tr>
          <td>Current Score: </td>
          <td>Max Score: </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{frameScores[frameScores.length - 1]}</td>
          <td>{maxScore}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CurrentGameStats;
