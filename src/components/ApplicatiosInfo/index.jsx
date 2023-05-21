import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';
import styles from './ApplicatiosInfo.module.scss';
import { WebSock } from '../WebSock/WebSock';

export const ApplicatiosInfo = ({ app }) => {
  const appObj = app[0];
  const openDate = new Date(appObj.applicationDate.date);
  const closedDate = new Date(appObj.closed.date);

  const { updateApplications } = WebSock();

  const Info = () => {
    return (
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.appInfo}>
            <div className={styles.top}>
              <span>Заявка №{appObj.id}</span>
              <span>{appObj.application.urgency}</span>
            </div>

            <h2>{appObj.application.department}</h2>

            <div className={styles.info}>
              <div>
                <span>Статус заявки</span>
                <span>{appObj.open ? 'Открыта' : 'Закрыта'}</span>
              </div>
              <div>
                <span>Дата формирования заявки</span>
                <span>{openDate.toLocaleString()}</span>
              </div>
              <div>
                <span>Проблема</span>
                <span>{appObj.application.problems}</span>
              </div>
              <div>
                <span>Комментарии</span>
                <span>{appObj.application.problemsDetails}</span>
              </div>
              <div>
                <span>Пользователь</span>
                <span>{appObj.customer.firstName}</span>
              </div>
              <div>
                <span>Кабинет</span>
                <span>{appObj.application.roomNumber}</span>
              </div>
              <div>
                <span>Исполнитель</span>
                <span>{appObj.executor.name}</span>
              </div>
              <div>
                <span>Дата закрытия заявки</span>
                <span>{appObj.closed.date && closedDate.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <button>Перенаправить</button>
          <button>Взять в работу</button>
          <button onClick={updateApplications}>Закрыть заявку</button>
        </div>
      </div>
    );
  };

  return <>{appObj ? <Info /> : <span>Нету такой заяки </span>}</>;
};

export const ApplicatiosInfoSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      // width={1180}
      // height={510}
      viewBox="0 0 1180 510"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="20" ry="20" width="580" height="470" />
      <rect x="600" y="0" rx="10" ry="10" width="150" height="20" />
      <rect x="600" y="35" rx="20" ry="20" width="310" height="228" />
      <rect x="930" y="0" rx="10" ry="10" width="150" height="20" />
      <rect x="930" y="35" rx="20" ry="20" width="250" height="228" />
      <rect x="600" y="280" rx="20" ry="20" width="580" height="189" />
      <rect x="600" y="480" rx="10" ry="10" width="150" height="30" />
      <rect x="770" y="480" rx="10" ry="10" width="150" height="30" />
      <rect x="940" y="480" rx="10" ry="10" width="150" height="30" />
    </ContentLoader>
  );
};
