import { FC } from "react";

interface Props {
  date: Date;
}
const DateString: FC<Props> = ({ date }) => {
  const d = new Date(date);
  return (
    <p>
      <span>{d.getUTCDay()}</span>
      {" / "}
      <span>{d.getDate()}</span>
      {" / "}
      <span>{d.getFullYear()}</span>
    </p>
  );
};
export default DateString;
