import React, { useContext } from 'react';
import styles from './MyApplicatios.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closedApp } from '../../redux/slices/dataSlice';
import { AppContext } from '../../App';

export const MyApplicatios = () => {
  const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN;
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
      <h2>Мои заявки</h2>
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
