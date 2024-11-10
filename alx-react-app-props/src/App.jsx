import React from "react";
import ProfilePage from "./components/ProfilePage";
import UserContext from "./components/userContext";

function App() {
  const userData = {
    name: "Abd-UlRahman",
    email: "a.khalid5322@gmail.com",
  };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
