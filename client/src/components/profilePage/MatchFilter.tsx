import { FC } from "react";
import { filterOptions } from "./../../Interfaces";

interface Props {
  filterOptions: filterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<filterOptions>>;
  sessionList: string[];
  resetFilters: () => void;
}

const MatchFilterSelect: FC<Props> = ({ filterOptions, sessionList, setFilterOptions, resetFilters }) => {
  const handleSessionFilterChange = (str: string) => {
    if (str !== filterOptions.session) {
      setFilterOptions({ ...filterOptions, session: str });
    }
  };

  return (
    <div className="filterContainer">
      <select name="matchFilter" id="matchFilter" className="matchFilter" onChange={(e) => handleSessionFilterChange(e.target.value)}>
        {sessionList.map((element, i) => (
          <option id="matchFilter" value={element} key={i} className="filterOption">
            {element}
          </option>
        ))}
      </select>
      <button onClick={() => resetFilters()}>reset filters</button>
    </div>
  );
};

export default MatchFilterSelect;
