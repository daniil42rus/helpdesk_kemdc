import React, { useContext, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import styles from './ApplicatiosInfo.module.scss';
import { closedApp, takeApp } from '../../redux/slices/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppContext } from '../../App';

export const ApplicatiosInfo = ({ app }) => {
  const appObj = app[0];
  const dispatch = useDispatch();

  const { WebSocketMessage } = useContext(AppContext);

  const { administrators } = useSelector((state) => state.data);
  const { user } = useSelector((status) => status.auth);

  const openDate = new Date(appObj.application.creation);
  const closedDate = new Date(appObj.application.closing);

  const [admin, setAdmin] = useState();

  const onClickClosed = async () => {
    const administrator = await user;
    await dispatch(closedApp({ appObj, administrator }));
    await WebSocketMessage('applications');
  };

  const onClickTake = async () => {
    const administrator = await user;
    await dispatch(takeApp({ appObj, administrator }));
    await WebSocketMessage('applications');
  };

  const { status } = useSelector((status) => status.auth);

  useEffect(() => {
    if (status) toast(status);
  }, [status]);

  const Info = () => {
    return (
      <div className={styles.content}>
        <div className={styles.left}>
          <div
            style={{
              borderLeft:
                (!appObj.open && '30px solid #C2C2C2') ||
                (appObj.application.urgency === 'Срочно (1-2 часа)' &&
                  '30px solid #FF7C7C') ||
                (appObj.application.urgency === 'В течении дня' &&
                  '30px solid #FFE999') ||
                (appObj.application.urgency === 'В течении 2х-3х дней' &&
                  '30px solid #A0D4AB') ||
                (appObj.application.urgency === 'В течении недели' &&
                  '30px solid #A0D4AB'),
            }}
            className={styles.appInfo}
          >
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
                <span>{appObj.application.details}</span>
              </div>
              <div>
                <span>Пользователь</span>
                <span>
                  {appObj.client && appObj.client.name}

                  {appObj.client && (
                    <a
                      href={'https://t.me/' + appObj.client.nickname}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {appObj.client.nickname}
                    </a>
                  )}
                </span>
              </div>
              <div>
                <span>Кабинет</span>
                <span>{appObj.application.room}</span>
              </div>
              {appObj.administrator && (
                <div>
                  <span>Исполнитель</span>
                  <span>{appObj.administrator.name}</span>
                </div>
              )}
              {appObj.application.closing && (
                <div>
                  <span>Дата закрытия заявки</span>
                  <span>{closedDate.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {appObj.open && (
          <div className={styles.right}>
            <div className={styles.rightContent}>
              {appObj.administrator && appObj.administrator.id === user.id && (
                <div className={styles.rightTop}>
                  <span>Выбрать исполнителя</span>
                  <select
                    value={admin}
                    onChange={(e) => setAdmin(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Исполнитель
                    </option>
                    {administrators.map((admin, index) => (
                      <option key={index} value={admin.name}>
                        {admin.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className={styles.rightTop}>
                <span>Заявку взял</span>
                <span>
                  {appObj.administrator
                    ? appObj.administrator.name
                    : 'Заявка ожидает своего администратора'}
                </span>
              </div>
            </div>
            <div className={styles.btnItems}>
              {appObj.administrator && appObj.administrator.id === user.id && (
                <button>Перенаправить</button>
              )}

              {!appObj.administrator && (
                <button onClick={() => onClickTake()}>Взять в работу</button>
              )}

              <button onClick={() => onClickClosed()}>Закрыть заявку</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      <Info />
    </>
  );
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
