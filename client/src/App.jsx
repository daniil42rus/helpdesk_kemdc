import { useEffect, useRef, useState } from 'react';
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

import { WebSock } from './components/WebSock/WebSock';
import { LoginPage } from './Page/LoginPage';

function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector(checkIsAuth);
  const isUser = useSelector(thisUser);
  const { status } = useSelector((status) => status.data);

  useEffect(() => {
    dispatch(getMe());
    if (status) toast(status);
  }, [dispatch, status]);

  // const applications = useSelector((state) => state.data.applications);

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

  return (
    <>
      {isAuth ? (
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
