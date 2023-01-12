import { FC } from "react";
import "./../css/scorecard.css";
interface Props {
  frame: Array<string>;
  num: number;
  score: number;
}

const Frame: FC<Props> = ({ frame, num, score }) => {
  if (num === 10) {
    return (
      <div className="frame10">
        <div className="title">{num}</div>
        <div className=" score1">{frame[0]}</div>
        <div className=" score2">{frame[1]}</div>
        <div className=" score3">{frame[2]}</div>
        <div className="total">{score === -1 ? "" : score}</div>
      </div>
    );
  }
  return (
    <div className="frame">
      <div className="title">{num}</div>
      <div className=" score1">{frame[0]}</div>
      <div className=" score2">{frame[1]}</div>
      <div className="total">{score === -1 ? "" : score}</div>
    </div>
  );
};

export default Frame;
