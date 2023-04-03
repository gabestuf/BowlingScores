import { FC } from "react";

interface Props {
  date: Date;
}

// Used to take a Date object and display it at a date dd/mm/yy
const DateString: FC<Props> = ({ date }) => {
  const d = new Date(date);
  return (
    <h5 style={{ display: "flex", gap: ".1rem" }}>
      <span>{d.getUTCDay()}</span>
      {"/"}
      <span>{d.getDate()}</span>
      {"/"}
      <span>{d.getFullYear()}</span>
    </h5>
  );
};
export default DateString;
