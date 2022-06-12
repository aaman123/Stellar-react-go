import { useEffect, useState } from "react";
import { useParams } from "react-router"
import styles from './Account.module.css';
import axios from "axios";
import { User } from "../../interfaces/User";
import { Button } from 'antd';
import BlockTree from '../../assets/images/blocktree.png';

const Account = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    axios.get(`http://localhost:8080/getUser?username=${username}`)
    .then((res) => {
      console.log(res)
      setUserData(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [username])
  
  return (
    <div className={styles.accountContainer}>
      <section className={styles.section}>
        <div className={styles.cardItemLeft}>
          <div>
            <h4 className={styles.cardTitle}>Seed Address</h4>
            <p className={styles.cardContent}>{userData?.User.SeedAddress}</p>
          </div>
        </div>
        <div className={styles.cardItemRight}>
          <div>
            <h4 className={styles.cardTitle}>Account ID</h4>
            <p className={styles.cardContent}>{userData?.User.AccountId}</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.cardItemLeft}>
          <div>
            <h4 className={styles.cardTitle}>Account Address</h4>
            <p className={styles.cardContent}>{userData?.User.AccountAddress}</p>
          </div>
        </div>
        <div className={styles.cardItemRight}>
          <div>
            <h4 className={styles.cardTitle}>Account Balance</h4>
            <p className={styles.cardContent}>{userData?.Balance.balance}</p>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.buttonWrapper}>
            <Button size="large" type="primary">Send Money</Button>
        </div>
      </section>
    </div>
  )
}

export default Account