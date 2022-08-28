import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import { TUser } from "../user.type";
import TextField from "@mui/material/TextField";

import styles from "./user.module.scss";

export default function User() {
  const params = useParams();
  const [user, setUser] = useState<TUser | null>(null);
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    const store = localStorage.getItem("users");
    const users: TUser[] = store ? JSON.parse(store) : [];
    const user = users.find((user) => Number(params.id) === user.id);
    if (user) setUser(user);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.avatarBlock}>
          <div className={styles.avatar}>
            <img className={styles.avatarImg} src={user?.avatar_url} />
          </div>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Name:</span>
              {user?.name ? user.name : "-"}
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email:</span>
              {user?.email ? user.email : "-"}
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Location:</span>
              {user?.location ? user.location : "-"}{" "}
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Join date:</span>
              {user?.created_at
                ? dayjs(user.created_at).format("DD.MM.YYYY")
                : "-"}
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Followers:</span>
              {user?.followers ? user.followers : "-"}
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Following:</span>
              {user?.following ? user.following : "-"}
            </div>

            <div></div>
          </div>
        </div>
        <div></div>
      </div>
      <div className={styles.text}>
        This is repo biography. It may be long and need to all fit.
      </div>
      <div className={styles.searchRepo}>
        <TextField
          className={styles.search}
          id="outlined-basic"
          label="Search for User's repositories"
          variant="outlined"
          value={search}
          onChange={(event) => {
            console.log("search");
            setSearch(event.target.value);
            // debounceGetSearchUser(event.target.value, users);
          }}
        />
      </div>
      <div className={styles.repoiesTable}></div>
    </div>
  );
}
