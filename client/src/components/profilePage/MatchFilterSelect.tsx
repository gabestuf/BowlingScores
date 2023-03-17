import { FC } from "react";

interface Props {
  filterOptions: string[];
}

const MatchFilterSelect: FC<Props> = ({ filterOptions }) => {
  return (
    <div className="filterContainer">
      <select name="matchFilter" id="matchFilter" className="matchFilter">
        {filterOptions.map((element, i) => (
          <option value={element} key={i} className="filterOption">
            {element}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MatchFilterSelect;
