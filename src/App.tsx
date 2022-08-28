import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { TUser } from "./components/user.type";
import Users from "./components/users/users";
import User from "./components/user/user";
import Header from "./components/header/header";
import "./App.scss";

// import CityList from "./components/cityList/cityList";
// import CityDetails from "./components/cityDetails/cityDetails";

function App() {
  const [users, setUsers] = useState<TUser[]>([]);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Users users={users} setUsers={setUsers} />} />
        <Route path="/:id" element={<User users={users} />} />
      </Routes>
    </div>
  );
}

export default App;
