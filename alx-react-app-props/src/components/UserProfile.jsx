import React, { useContext } from "react";
import UserContext from "./userContext";

function UserDatails() {
  const userData = useContext(UserContext);
  return (
    <div>
      <p> Name: {userData.name}</p>
      <p> Email: {userData.email}</p>
    </div>
  );
}

export default UserDatails;
