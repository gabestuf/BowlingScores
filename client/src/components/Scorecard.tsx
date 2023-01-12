import { FC, useEffect, useState } from "react";
import "./../css/scorecard.css";
import Frame from "./Frame";

interface Props {
  frameList: number[][];
}

const Scorecard: FC<Props> = ({ frameList }) => {
  const [frameScores, setFrameScores] = useState<Array<number>>([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);

  useEffect(() => {
    setFrameScores(calcFrameScores(convertFrameList(frameList)));
  }, [frameList]);

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

  function calcFrameScores(fList: Array<Array<string>>): Array<number> {
    // console.log("FLIST");
    // console.log(fList);
    const fScores: Array<number> = [];

    // for each of the 10 frames
    for (let i = 0; i < 9; i++) {
      // If the frame hasn't been bowled yet, ignore it
      if (fList[i].length === 1 || (fList[i][0] === " " && fList[i][1] === " ")) {
        continue;
      }
      // FIRST BALL
      // If Strike,
      if (fList[i][1] === "X") {
        if (Number.isNaN(checkStrikeCount(fList, i))) {
          fScores[i] = -1;
        } else {
          fScores[i] = 10 + checkStrikeCount(fList, i);
        }
      }
      // If empty
      if (fList[i][0] === " ") {
        continue;
      }
      if (fList[i][0] === "-" || fList[i][0] === "F") {
        fScores[i] = 0;
      } else {
        fScores[i] = parseInt(fList[i][0]);
      }
      // SECOND BALL
      // check if 2nd ball has been thrown yet
      if (fList[i].length === 1) {
        continue;
      }
      // If 0 or fowl, no need to add anything to f score
      if (fList[i][1] === "-" || fList[i][1] === "F") {
        continue;
      }
      // check spare
      else if (fList[i][1] === "/") {
        if (Number.isNaN(checkSpareCount(fList, i))) {
          fScores[i] = -1;
        } else {
          fScores[i] = 10 + checkSpareCount(fList, i);
        }
      } else {
        fScores[i] = fScores[i] + parseInt(fList[i][1]);
      }
    }
    // console.log("Fscores");
    // console.log(fScores);

    // 10th frame

    let count = 0;
    if ((fList[9].length === 2 && fList[9][1] !== "X" && fList[9][1] !== "/" && fList[9][0] !== "X") || (fList[9].length === 3 && fList[9][2] !== " ")) {
      if (fList[9][0] !== " " && fList[9][0] !== "-") {
        if (fList[9][0] === "X") {
          count += 10;
        } else {
          count += parseInt(fList[9][0]);
        }
      }

      if (fList[9].length > 1 && fList[9][1] !== " " && fList[9][1] !== "-") {
        if (fList[9][1] === "/") {
          count = 10;
        } else if (fList[9][1] === "X") {
          count += 10;
        } else {
          count += parseInt(fList[9][1]);
        }
      }
      if (fList[9].length > 2 && fList[9][2] !== " " && fList[9][2] !== "-") {
        if (fList[9][2] === "X") {
          count += 10;
        } else if (fList[9][2] === "/") {
          count += 10 - parseInt(fList[9][1]);
        } else {
          count += parseInt(fList[9][2]);
        }
      }
      fScores[9] = count;
    }

    let finalScores: Array<number> = [];
    let filteredScores = fScores.filter((item) => item !== -1);
    finalScores = filteredScores.map((score, index) => sumArray(0, index, filteredScores));
    // console.log("FINALSCORE");
    // console.log(finalScores);

    return finalScores;
  }

  function sumArray(start: number, end: number, array: Array<number>): number {
    let sum = 0;
    for (let i = start; i <= end; i++) {
      sum += array[i];
    }
    return sum;
  }

  function checkSpareCount(frameList: string[][], frameIndex: number): number {
    // check if the next frame is a strike
    if (frameList[frameIndex + 1][1] === "X") {
      return 10;
    }
    // if not, check if the next frame was bowled yet
    // special case for if it's the 9th frame, then check if the first of 10th is a strike
    if (frameIndex === 8 && frameList[9][0] === "X") {
      return 10;
    }
    // next, check if the next ball is a zero
    if (frameList[frameIndex + 1][0] === "-") {
      return 0;
    } else {
      // if not, it's a number, add that number to the count
      return parseInt(frameList[frameIndex + 1][0]);
    }
    // if not return 0
    return 0;
  }

  function checkStrikeCount(frameList: string[][], frameIndex: number): number {
    let count = 0;

    // 8th frame
    if (frameIndex === 7) {
      // 3 in a row
      if (frameList[frameIndex + 1][1] === "X" && frameList[frameIndex + 2][0] === "X") {
        return 20;
      }
      // 2 in a row
      else if (frameList[frameIndex + 1][1] === "X" && frameList[frameIndex + 2][0] !== "X") {
        if (frameList[frameIndex + 2][0] === "-") {
          return 10;
        } else {
          return 10 + parseInt(frameList[frameIndex + 2][0]);
        }
      }
      // only 1
      else {
        // first ball
        if (frameList[frameIndex + 1][0] !== "-") {
          count += parseInt(frameList[frameIndex + 1][0]);
        }
        // second ball
        if (frameList[frameIndex + 1][1] === "/") {
          count = 10;
        } else {
          count += parseInt(frameList[frameIndex + 1][1]);
        }
      }
      return count;
    }

    // 9th frame
    if (frameIndex === 8) {
      // 3 in a row
      if (frameList[frameIndex + 1][0] === "X" && frameList[frameIndex + 1][1] === "X") {
        return 20;
      }
      // 2 in a row
      else if (frameList[frameIndex + 1][0] === "X" && frameList[frameIndex + 1][1] !== "X") {
        return 10 + parseInt(frameList[frameIndex + 1][1]);
      }
      // only 1
      else {
        // first ball
        if (frameList[frameIndex + 1][0] === "-") {
          count += 0;
        } else {
          count += parseInt(frameList[frameIndex + 1][0]);
        }
        // second ball
        if (frameList[frameIndex + 1][1] === "/") {
          count = 10;
        } else if (frameList[frameIndex + 1][1] === "-") {
          count += 0;
        } else {
          count += parseInt(frameList[frameIndex + 1][1]);
        }
      }
      return count;
    }
    // NORMAL CASE
    // 3 strikes in a row
    if (frameList[frameIndex + 1][1] === "X" && frameList[frameIndex + 2][1] === "X") {
      return 20;
    }
    // 2 strikes in a row
    if (frameList[frameIndex + 1][1] === "X" && frameList[frameIndex + 2][1] !== "X") {
      if (frameList[frameIndex + 2][0] === "-") {
        return 10;
      } else {
        return 10 + parseInt(frameList[frameIndex + 2][0]);
      }
    }

    // only 1 strike
    // Check if the next ball is thrown
    if (frameList[frameIndex + 1][0] !== " ") {
      // If the next ball has been thrown
      // then check if it is 0
      if (frameList[frameIndex + 1][0] !== "-") {
        // if it isn't 0, add it to the count
        count += parseInt(frameList[frameIndex + 1][0]);
      }

      // next, check if the next ball of the frame has been thrown
      if (frameList[frameIndex + 1][1] !== " ") {
        // then check if it is 0
        if (frameList[frameIndex + 1][1] !== "-") {
          // if it isn't 0, add it to the count
          if (frameList[frameIndex + 1][1] === "/") {
            count = 10;
          } else {
            count += parseInt(frameList[frameIndex + 1][1]);
          }
        }
      }
    } else {
      return NaN;
    }
    // if not return 0
    return count;
  }

  return (
    <>
      <div className="scorecard">
        {convertFrameList(frameList).map((frame, i) => (
          <Frame frame={frame} num={i + 1} key={i} score={frameScores[i]} />
        ))}
      </div>
    </>
  );
};

export default Scorecard;
