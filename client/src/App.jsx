import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from './Page/Home';
import { Applications } from './Page/Applications';

import { Employees } from './Page/Employees';
import { Monitoring } from './Page/Monitoring';

import { Header } from './components/Header';
import { AsideMenu } from './components/AsideMenu';

import { useSelector, useDispatch } from 'react-redux';
import {
  setApplications,
  setExecutors,
  setCustomers,
} from './redux/slices/dataSlice';

import './App.css';
import { ApplicationCard } from './Page/ApplicationCard';
import { local } from './utils/axios';

function App() {
  const dispatch = useDispatch();
  // const { id } = useParams();
  // const applications = useSelector((state) => state.data.applications);

  useEffect(() => {
    const fetchData = async () => {
      // const getExecutors = await local.get('executors');
      // const getCustomers = await local.get('customers');
      const getApplications = await local.get('applications');

      // dispatch(setExecutors(getExecutors.data));
      // dispatch(setCustomers(getCustomers.data));
      dispatch(setApplications(getApplications.data));


    };

    fetchData();
  }, [dispatch]);

  return (
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
          <Route path="*" element="НЕТУ ТАКОГО " />
        </Routes>
      </div>
    </div>
  );
}

export default App;
