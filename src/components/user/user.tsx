import React, { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import { TUser, TRepo } from "../user.type";
import TextField from "@mui/material/TextField";
import iconAttention from "../../images/Icon_attention.png";

import styles from "./user.module.scss";
import RepoItem from "../repoItem/repoItem";

export default function User() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [repos, setRepos] = useState<TRepo[] | null>(null);
  useEffect(() => {
    const store = localStorage.getItem("users");
    const users: TUser[] = store ? JSON.parse(store) : [];
    const user = users.find((user) => Number(params.id) === user.id);
    if (user) setUser(user);
  }, []);

  useEffect(() => {}, []);

  const getRepos = useCallback(
    async (user: TUser) => {
      let timerId;
      try {
        setIsLoading(true);
        if (user && user?.repos_url) {
          let response = await fetch(user.repos_url);
          const repositories = await response.json();
          setRepos(
            repositories?.map((repo: any) => {
              return {
                id: repo?.id,
                name: repo?.name,
                forks_url: repo?.forks_url,
                stargazers_url: repo?.stargazers_url,
              };
            })
          );
        }
      } catch (err) {
        setError(`Geting repositories failed, try letter`);
        timerId = setTimeout(() => setError(null), 3000);
      } finally {
        if (timerId) clearTimeout(timerId);
        setIsLoading(false);
      }
    },
    [setError, setRepos]
  );

  useEffect(() => {
    if (user) {
      getRepos(user);
    }
  }, [user]);

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
            setSearch(event.target.value);
          }}
        />
      </div>
      <div className={styles.repoiesTable}>
        {!isLoading ? (
          repos
            ?.filter((repo) =>
              repo?.name?.toLowerCase().includes(search?.toLowerCase())
            )
            ?.map((repo) => <RepoItem key={repo.id} repo={repo} />)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
