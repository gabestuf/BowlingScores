import { FC, useState } from "react";
import Profile from "./components/Profile";

interface Props {
  isLoggedIn: boolean;
}

const ProfilePage: FC<Props> = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Profile />;
  } else {
    return <h2 className="ProfilePage">You must be logged in to view this page</h2>;
  }
};

export default ProfilePage;
