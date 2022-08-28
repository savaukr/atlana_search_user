import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./components/users/users";
import "./App.scss";

// import CityList from "./components/cityList/cityList";
// import CityDetails from "./components/cityDetails/cityDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:id" element={<div>user</div>} />
      </Routes>
    </div>
  );
}

export default App;
