import { FC } from "react";

interface Props {
  frameList: number;
}

const CurrentGameStats: FC<Props> = ({ frameList }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Current Score</td>
          <td>Max Score</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CurrentGameStats;
