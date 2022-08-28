import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./components/users/users";
import User from "./components/user/user";
import Header from "./components/header/header";
import "./App.scss";

// import CityList from "./components/cityList/cityList";
// import CityDetails from "./components/cityDetails/cityDetails";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:id" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
