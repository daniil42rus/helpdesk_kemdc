import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import { Calendar } from '../../components/Calendar';
import { MyApplicatios } from '../../components/MyApplicatios';
import { Profile } from '../../components/Profile';
import { useSelector } from 'react-redux';

export const Home = () => {
  const { user } = useSelector((status) => status.auth);

  return (
    <div className={styles.home_content}>
      <div className={styles.welcomeTop}>
        <h2>Главная</h2>
        <div className={styles.welcome}>
          <div className={styles.welcome_content}>
            <h2 className={styles.hello}>Привет, {user.name}!</h2>
            <p className={styles.text}>
              Ничего не сработает, если не работаешь ты.
            </p>
            <span className={styles.jhon}>(Джон Вуден)</span>
            {/* <span className={styles.nice}>Приятной работы!</span> */}
          </div>
          <img src="img/сoder.svg" alt="" />
        </div>
      </div>

      {/* <Calendar /> */}
      <Profile />
      <MyApplicatios />
    </div>
  );
};
