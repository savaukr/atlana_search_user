import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TUser } from "../user.type";

import TextField from "@mui/material/TextField";
import { debounce } from "../../helpers/debounce";
import iconAttention from "../../images/Icon_attention.png";

import styles from "./users.module.scss";

// onClick={() => {
//     navigate(`/${user.id}`);
//   }}

export default function Users() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    const usersLocalStorage = localStorage.getItem("users");
    if (usersLocalStorage) setUsers(JSON.parse(usersLocalStorage));
  }, []);

  // fetch(`https://api.github.com/users/${user.name}`))

  // try {
  //   let response = await fetch(
  //     "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
  //   );
  //   const json = await response.json();
  //   setExchRate([json[0], json[1]]);
  // } catch (err) {
  //   err.message = "Can not get exchange rate, try latter";
  //   throw err;
  // }

  const getSearchUsers = useCallback(async (userName: string) => {
    let timerId;
    try {
      let response = await fetch(`https://api.github.com/users/${userName}`);
      const json = await response.json();
      console.log("json:", json);
      const newUsers = [...users, json];
      setUsers(newUsers);
      localStorage.setItem("users", JSON.stringify(newUsers));
    } catch (err) {
      setError(`Do not get users with name ${search}, try letter`);
      timerId = setTimeout(() => setError(null), 3000);
    } finally {
      if (timerId) clearTimeout(timerId);
    }
  }, []);

  const debounceGetSearchUser = useCallback(debounce(getSearchUsers, 1000), []);

  return (
    <div className={styles.wrapper}>
      {error ? (
        <div className={styles.error}>
          <div>
            <img
              src={iconAttention}
              alt="attention"
              width="20px"
              height="20px"
            />
          </div>
          <div>{error}</div>
        </div>
      ) : null}
      <TextField
        className={styles.search}
        id="outlined-basic"
        label="Search for User"
        variant="outlined"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          debounceGetSearchUser(event.target.value);
        }}
      />
    </div>
  );
}
