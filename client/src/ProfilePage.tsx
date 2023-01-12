import { FC, useState } from "react";
import "./css/ProfilePage.css";
import Profile from "./components/Profile";

interface Props {
  isLoggedIn: boolean;
}

const ProfilePage: FC<Props> = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Profile />;
  } else {
    return <div className="ProfilePage">Please log in to view this page</div>;
  }
};

export default ProfilePage;
