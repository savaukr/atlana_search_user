import React, { useEffect, useState } from "react";
import { TRepo } from "../user.type";
import iconAttention from "../../images/Icon_attention.png";

import styles from "./repoItem.module.scss";

type Props = { repo: TRepo };
function RepoItem({ repo }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [amountForks, setAmountForks] = useState<number>(0);
  const [amountStars, setAmountStars] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const getDetails = async () => {
    let timerId;
    try {
      setIsLoading(true);
      if (repo) {
        let response = await fetch(repo.forks_url);
        const forks = await response.json();
        setAmountForks(forks?.length);
      }
    } catch (err) {
      setError("Geting repositories details failed, try letter");
      timerId = setTimeout(() => setError(null), 3000);
    } finally {
      if (timerId) clearTimeout(timerId);
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
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
      <div className={styles.repo}>
        <div className={styles.repoName}>{repo.name}</div>
        <div className={styles.amounts}>
          <div>{} Forks</div>
          <div>{} Stars</div>
        </div>
      </div>
    </>
  );
}
export default RepoItem;
