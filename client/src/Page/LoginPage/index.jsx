import React, { useState, useEffect } from 'react';
import {
  checkIsAuth,
  loginUser,
  thisUser,
} from '../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './loginpage.module.scss';

export const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const isAuth = useSelector(checkIsAuth);

  const { status } = useSelector((status) => status.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate('/');
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ login, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className={styles.right}>
          <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <h2 className={styles.form__heading}>Войти в систему</h2>
            <label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Логин"
                className={styles.form__login}
              />
            </label>
            <label>
              <input
                type="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                className={styles.form__password}
              />
            </label>
            <button
              className={styles.form__button}
              type="submit"
              onClick={handleSubmit}
            >
              Войти
            </button>
          </form>
        </div>
        <h1 className={styles.login__heading}>
          Добро пожаловать <br />
        </h1>
      </div>
    </main>
  );
};
