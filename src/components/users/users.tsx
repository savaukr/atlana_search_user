import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { TUser } from "../user.type";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { debounce } from "../../helpers/debounce";
import iconAttention from "../../images/Icon_attention.png";

import styles from "./users.module.scss";
import { isBrowser } from "@emotion/utils";

// onClick={() => {
//     navigate(`/${user.id}`);
//   }}

const columns = [
  { name: "Avatar", width: "25%" },
  { name: "Name", width: "45%" },
  { name: "Link", width: "30%" },
];

export default function Users() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    const usersLocalStorage = localStorage.getItem("users");
    console.log("usersLocalStorage:", usersLocalStorage);
    if (usersLocalStorage) setUsers(JSON.parse(usersLocalStorage));
    else localStorage.setItem("users", JSON.stringify(users));
  }, []);

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

  const rows = useMemo(
    () =>
      users.reduce<
        {
          id: number;
          img: string;
          name: string | null;
          login: string;
          link: string;
        }[]
      >((acc, user) => {
        acc.push({
          id: user.id,
          img: user.avatar_url,
          name: user.name,
          login: user.login,
          link: user.html_url,
        });
        return acc;
      }, []),
    [users]
  );

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
      <div className={styles.tableUsers}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.name}
                    align={"left"}
                    style={{ width: column.width }}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell
                      onClick={() => navigate(`/${row.id}`)}
                      className={styles.hover}
                    >
                      <img src={row.img} width="40px" height="40px" />
                    </TableCell>
                    <TableCell
                      onClick={() => navigate(`/${row.id}`)}
                      className={styles.hover}
                    >
                      {row.name || row.login}
                    </TableCell>
                    <TableCell>
                      <a href={row.link} target="blank" className={styles.link}>
                        link to repo
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
