import { FC } from "react";
import "./../css/scorecard.css";
import Frame from "./Frame";

interface Props {
  frameList: number[][];
  frameScores: number[];
}

function convertFrame(frame: Array<number>, isLastFrame: boolean): Array<string> {
  let arr: Array<string> = [];

  for (let i = 0; i < frame.length; i++) {
    // normal logic
    if (frame[i] === 0) {
      // Gutter
      arr.push("-");
    } else if ((i === 1 || i === 2) && frame[i] + frame[i - 1] === 10 && !(frame[i - 2] + frame[i - 1] === 10)) {
      // Spare
      arr.push("/");
    } else if (frame[i] === 10) {
      // Strike
      if (isLastFrame) {
        // last frame check
        if (arr[arr.length - 1] === "-") {
          arr.push("/");
        } else {
          arr.push("X");
        }
      } else {
        arr.push(" ");
        arr.push("X");
      }
    } else {
      // Normal case, hit 1-9 pins
      arr.push(frame[i].toString());
    }
  }
  return arr;
}

function convertFrameList(fList: Array<Array<number>>): Array<Array<string>> {
  const arr: Array<Array<string>> = [];
  for (let i = 0; i < 9; i++) {
    if (fList[i]) {
      arr.push(convertFrame(fList[i], false));
    } else {
      arr.push([" ", " "]);
    }
  }
  if (fList[9]) {
    arr.push(convertFrame(fList[9], true));
  } else {
    arr.push([" ", " ", " "]);
  }
  return arr;
}

const Scorecard: FC<Props> = ({ frameList, frameScores }) => {
  return (
    <div className="scorecard">
      {convertFrameList(frameList).map((frame, i) => (
        <Frame frame={frame} num={i + 1} key={i} score={frameScores[i]} />
      ))}
    </div>
  );
};

export default Scorecard;
