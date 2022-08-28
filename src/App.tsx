import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { TUser } from "./components/user.type";
import Users from "./components/users/users";
import User from "./components/user/user";
import Header from "./components/header/header";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:id" element={<User />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
