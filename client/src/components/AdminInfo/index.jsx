import React from 'react';
import styles from './AdminInfo.module.scss';

export const AdminInfo = ({user}) => {
  return (
    <>
      <div className={styles.userTop}>
        <h3>{user.name && user.name}</h3>
      </div>
      <div className={styles.userContent}>
        <div className={styles.userInfo}>
          <span className={styles.userLeft}>Почта</span>
          <span>{user.email}</span>
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userLeft}>Место работы</span>
          <span>{user.organization}</span>
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userLeft}>Должность</span>
          <span>{user.jobTitle}</span>
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userLeft}>Номер телефона</span>
          <span>{user.phone}</span>
        </div>
      </div>
    </>
  );
};
