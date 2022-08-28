import React from "react";
import { useParams } from "react-router-dom";
import { TUser } from "../user.type";
import styles from "./user.module.scss";
type Props = {
  users: TUser[];
};
export default function User({ users }: Props) {
  const params = useParams();
  const user = users.find((user) => Number(params.id) === user.id);
  return (
    <div className={styles.wrapper}>
      <div>
        <div>
          <div></div>
        </div>
        <div></div>
      </div>
      <div>This is repo biography. It may be long and need to all fit.</div>
      <div className={styles.repoesTable}></div>
    </div>
  );
}
