import { FC } from "react";
import "./../css/keypad.css";

interface Props {
  title: string;
  addThrow: (val: number) => void;
  availableInputs: Array<boolean>;
  removeThrow: () => void;
}

const Title: FC<Props> = ({ title, addThrow, availableInputs, removeThrow }) => {
  const handleBtnClick = (val: number) => {
    addThrow(val);
  };
  return (
    <div className="keypadContainer">
      <h1>{title}</h1>
      <div className="keypad">
        <button
          onClick={() => {
            handleBtnClick(1);
          }}
          className="btn1"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[0]}
        >
          {"1"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(2);
          }}
          className="btn2"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[1]}
        >
          {"2"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(3);
          }}
          className="btn3"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[2]}
        >
          {"3"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(4);
          }}
          className="btn4"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[3]}
        >
          {"4"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(5);
          }}
          className="btn5"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[4]}
        >
          {"5"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(6);
          }}
          className="btn6"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[5]}
        >
          {"6"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(7);
          }}
          className="btn7"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[6]}
        >
          {"7"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(8);
          }}
          className="btn8"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[7]}
        >
          {"8"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(9);
          }}
          className="btn9"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[8]}
        >
          {"9"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(0);
          }}
          className="btn10"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[9]}
        >
          {"-"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(11);
          }}
          className="btn11"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[10]}
        >
          {"/"}
        </button>
        <button
          onClick={() => {
            handleBtnClick(10);
          }}
          className="btn12"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[11]}
        >
          {"X"}
        </button>
        <button
          onClick={() => {
            removeThrow();
          }}
          className="btn13"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[12]}
        >
          {"⎌"}
        </button>
        {/* <button
          onClick={() => {
            handleBtnClick(12);
          }}
          className="btn14"
          style={{ border: "2px solid black", backgroundColor: "white", fontWeight: "bold", borderRadius: ".3rem" }}
          disabled={!availableInputs[13]}
        >
          {"F"}
        </button> */}
      </div>
    </div>
  );
};

export default Title;
