import { FC } from "react";

interface Props {
  setValue: React.Dispatch<React.SetStateAction<any>>;
}
const Select: FC<Props> = () => {
  return <div className="SelectElement"></div>;
};

export default Select;
