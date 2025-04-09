import { useState, FC, useEffect } from "react";
import ScorecardHandler from "./components/scorecardPage/ScorecardHandler";
import Input from "./components/scorecardPage/Input";
import ScorecardOptions from "./components/scorecardPage/ScorecardOptions";
import { CookieSetOptions } from "universal-cookie";
import SessionHandler from "./components/scorecardPage/BowlingSessionHandler";

const PageNotFoundPage: FC = () => {
  return (
    <div>
      <p>Error 404: Page not found</p>
    </div>
  );
};

export default PageNotFoundPage;
