import React, { useContext } from 'react';
import styles from './MyApplicatios.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closedApp } from '../../redux/slices/dataSlice';
import { AppContext } from '../../App';

export const MyApplicatios = () => {
  const { WebSocketMessage } = useContext(AppContext);

  const dispatch = useDispatch();
  const applications = useSelector((state) => state.data.applications);
  const { user } = useSelector((status) => status.auth);

  const MyOpenApplications = applications.filter((obj) => {
    const administrator = obj.administrator ? obj.administrator.name : false;
    if (obj.open && administrator === user.name) {
      return obj;
    }
    return false;
  });

  const onClickClosed = async (appObj) => {
    const administrator = await user;

    await dispatch(closedApp({ appObj, administrator }));
    await WebSocketMessage('applications');
  };

  return (
    <div className={styles.myApplicatios}>
      <div className={styles.myApplicatiosTop}>
        <h2>Мои заявки</h2>
        <button>
          <span>Смотреть все</span>
          <svg
            width="13"
            height="10"
            viewBox="0 0 13 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L11.7519 4.16795C12.3457 4.56377 12.3457 5.43623 11.7519 5.83205L7 9"
              stroke="#313A33"
              strokeLinecap="round"
            />
            <path
              d="M1 1L5.75192 4.16795C6.34566 4.56377 6.34566 5.43623 5.75192 5.83205L1 9"
              stroke="#313A33"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <ul>
        <li>
          <span>№ заявки</span>
          <span>Подразделение</span>
          <span>Проблемма</span>
          <span>Кабинет</span>
        </li>
      </ul>

      <ul>
        {MyOpenApplications.map((obj) => (
          <li key={obj.id}>
            <Link to={`/application/${obj.id}`}>
              <span>{obj.id}</span>
            </Link>

            <span>{obj.application.department}</span>
            <span>
              {obj.application.problems} {obj.application.problemsDetails}
            </span>
            <span>{obj.application.room}</span>

            <button onClick={() => onClickClosed(obj)}>Закрыть заявку</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
