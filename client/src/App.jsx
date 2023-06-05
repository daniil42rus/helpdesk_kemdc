import { createContext, useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { checkIsAuth, getMe, thisUser } from './redux/features/auth/authSlice';

import { Home } from './Page/Home';
import { Applications } from './Page/Applications';

import { Employees } from './Page/Employees';
import { Monitoring } from './Page/Monitoring';

import { Header } from './components/Header';
import { AsideMenu } from './components/AsideMenu';

import { useSelector, useDispatch } from 'react-redux';
import {
  setApplications,
  setAdministrators,
  setClients,
  getApplications,
} from './redux/slices/dataSlice';

import './App.css';
import { ApplicationCard } from './Page/ApplicationCard';
import { local } from './utils/axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoginPage } from './Page/LoginPage';

export const AppContext = createContext({});

function App() {
  const dispatch = useDispatch();

  const socket = useRef();

  const isAuth = useSelector(checkIsAuth);

  const isUser = useSelector(thisUser);
  const { status } = useSelector((status) => status.data);

  useEffect(() => {
    dispatch(getMe());
    if (status) toast(status);
  }, [dispatch, status]);

  // const { applications } = useSelector((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      const getAdministrators = await local.get('administrators');
      // const getClients = await local.get('clients');
      const getApplications = await local.get('applications');

      dispatch(setAdministrators(getAdministrators.data));
      // dispatch(setClients(getClients.data));
      dispatch(setApplications(getApplications.data));
    };
    fetchData();
  }, [dispatch, isAuth, isUser]);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:5001');
    socket.current.onopen = () => {
      console.log('open');
    };

    socket.current.onmessage = (event) => {
      console.log('Сообщение');

      const message = JSON.parse(event.data);
      dispatch(setApplications(message));
    };
    socket.current.onclose = () => {
      console.log('Socket закрыт');
      window.location.reload();
      // alert('Socket закрыт');
      // alert('Обновите страницу');
    };
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка');
      alert('Socket произошла ошибка');
      alert('Обновите страницу');
    };
    setInterval(() => {
      WebSocketMessage('applications');
    }, 60000);
  }, []);

  const WebSocketMessage = (mess) => {
    const message = {
      id: Date.now(),
      event: mess,
    };
    socket.current.send(JSON.stringify(message));
  };

  return (
    <>
      {isAuth ? (
        <AppContext.Provider value={{ WebSocketMessage }}>
          <div className="main">
            <AsideMenu />
            <div className="content">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/application/:id" element={<ApplicationCard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/monitoring" element={<Monitoring />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element="НЕТУ ТАКОГО " />
              </Routes>
            </div>
          </div>
        </AppContext.Provider>
      ) : (
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      )}
      <ToastContainer to position="bottom-right" />
    </>
  );
}

export default App;
