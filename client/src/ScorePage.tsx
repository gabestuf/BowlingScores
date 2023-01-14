import { useState, FC, Fragment } from "react";
import ScorecardHandler from "./components/ScorecardHandler";
import Input from "./components/Input";
import ScorecardOptions from "./components/ScorecardOptions";

interface Props {
  frameList: number[][];
  setFrameList: React.Dispatch<React.SetStateAction<number[][]>>;
}

const ScorePage: FC<Props> = ({ frameList, setFrameList }) => {
  const [currentFrame, setCurrentFrame] = useState<Array<number>>([]);
  const [isFirstShot, setIsFirstShot] = useState<boolean>(true);
  const [availableInputs, setAvailableInputs] = useState<Array<boolean>>([true, true, true, true, true, true, true, true, true, true, false, true, true]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [frameScores, setFrameScores] = useState<Array<number>>([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);

  const resetGame = () => {
    setCurrentFrame([]);
    setIsFirstShot(true);
    setAvailableInputs([true, true, true, true, true, true, true, true, true, true, false, true, true]);
    setIsGameOver(false);
    setFrameScores([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    setFrameList([]);
  };

  const addThrow = (val: number): void => {
    // 10th frame logic
    if ((frameList.length === 9 && (frameList[8].length === 2 || frameList[8][0] === 10)) || frameList.length === 10) {
      switch (currentFrame.length) {
        case 0:
          if (val <= 9) {
            setCurrentFrame([val]);
            disableInput(val);
          } else if (val === 10) {
            setCurrentFrame([10]);
          }
          setFrameList([...frameList, [val]]);
          break;
        case 1:
          if (val <= 9) {
            const currFrame = [...currentFrame];
            currFrame.push(val);
            if (currentFrame[0] !== 10) {
              gameOver(currFrame);
            } else {
              setCurrentFrame(currFrame);
              const newFrameList = [...frameList];
              newFrameList[newFrameList.length - 1] = currFrame;
              setFrameList(newFrameList);
              disableInput(val);
            }
          } else if (val === 10) {
            setCurrentFrame([10, 10]);
            const newFrameList = [...frameList];
            newFrameList[newFrameList.length - 1] = [10, 10];
            setFrameList(newFrameList);
          } else if (val === 11) {
            const currFrame = [...currentFrame];
            currFrame.push(10 - currentFrame[0]);
            setCurrentFrame(currFrame);
            const newFrameList = [...frameList];
            newFrameList[newFrameList.length - 1] = currFrame;
            setFrameList(newFrameList);
            resetAvail();
          }
          break;
        case 2:
          if (val <= 9) {
            const currFrame = [...currentFrame];
            currFrame.push(val);
            gameOver(currFrame);
          } else if (val === 10) {
            const currFrame = [...currentFrame];
            currFrame.push(val);
            gameOver(currFrame);
          } else if (val === 11) {
            const currFrame = [...currentFrame];
            currFrame.push(10 - currentFrame[currentFrame.length - 1]);
            gameOver(currFrame);
          }
          break;
        default:
          break;
      }
    } else if (val === 10) {
      // Strike, update frame
      setFrameList([...frameList, [10]]);
      //reset
      setIsFirstShot(true);
      setCurrentFrame([]);
      resetAvail();
    } else if (val === 11) {
      // Spare
      const currFrame = [...currentFrame, 10 - currentFrame[0]];
      const newFramelist = [...frameList];
      newFramelist[newFramelist.length - 1] = currFrame;
      setFrameList(newFramelist);
      //reset
      setIsFirstShot(true);
      setCurrentFrame([]);
      resetAvail();
    } else if (isFirstShot) {
      setIsFirstShot(false);
      // Disabling certain buttons on the input
      disableInput(val);
      // Use the value and add that value to the currentFrame
      setCurrentFrame([val]);
      setFrameList([...frameList, [val]]);
    } else {
      const currFrame = [...currentFrame, val];
      const newFramelist = [...frameList];
      newFramelist[newFramelist.length - 1] = currFrame;
      setFrameList(newFramelist);
      // reset
      setIsFirstShot(true);
      setCurrentFrame([]);
      resetAvail();
    }
  };

  const removeThrow = () => {
    setIsGameOver(false);
    let newFrameList = [...frameList];
    newFrameList.pop();
    setCurrentFrame([]);
    setFrameList(newFrameList);
    setIsFirstShot(true);
    resetAvail();
    if (frameList.length < 1) {
      const avail = [...availableInputs];
      avail[12] = false;
      setAvailableInputs(avail);
    }
  };

  const resetAvail = () => {
    const x = [true, true, true, true, true, true, true, true, true, true, false, true, true];
    setAvailableInputs(x);
  };

  const noAvail = () => {
    const x = [false, false, false, false, false, false, false, false, false, false, false, false, true];
    setAvailableInputs(x);
  };

  const gameOver = (currFrame: Array<number>): void => {
    const newFrameList = [...frameList];
    newFrameList[newFrameList.length - 1] = currFrame;
    setFrameList(newFrameList);
    noAvail();
    setIsGameOver(true);
  };

  const disableInput = (val: number): void => {
    // Disabling certain buttons on the input
    let nextInputs = [...availableInputs];
    for (let i = 9 - val; i < 12; i++) {
      if (i === 9) continue;
      nextInputs[i] = false;
    }
    nextInputs[10] = true; // enables spare button
    nextInputs[12] = true; // enables undo button
    setAvailableInputs(nextInputs);
  };

  return (
    <div className="App">
      <ScorecardHandler showDetails={true} frameList={frameList} frameScores={frameScores} setFrameScores={setFrameScores} />
      <Input title="Input" addThrow={addThrow} removeThrow={removeThrow} availableInputs={availableInputs} />
      {isGameOver ? <ScorecardOptions frameList={frameList} frameScores={frameScores} resetGame={resetGame} /> : null}
    </div>
  );
};

export default ScorePage;
