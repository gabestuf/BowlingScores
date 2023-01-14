import { FC, Fragment } from "react";
import "./../css/LoadingDisplay.css";
import BowlingPinSVG from "./../images/Bowling_Pin.svg";

interface Props {}

const LoadingDisplay: FC<Props> = () => {
  return (
    <Fragment>
      <img className="loading" src={BowlingPinSVG} alt="Loading..." />
      <h4>Loading...</h4>
    </Fragment>
  );
};

export default LoadingDisplay;
