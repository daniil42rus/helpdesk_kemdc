import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

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

function App() {
  // const [executors, setExecutors] = useState([]);
  // const [customers, setCustomers] = useState([]);
  // const [applications, setApplications] = useState([]);

  //   const selectApp = useSelector((state) => state.selectApp.applications);

  const dispatch = useDispatch();
  const { id } = useParams();

  const applications = useSelector((state) => state.data.applications);

  useEffect(() => {
    const fetchData = async () => {
      const getExecutors = await axios.get('http://localhost:3004/executors');
      const getCustomers = await axios.get('http://localhost:3004/customers');
      const getApplications = await axios.get(
        'http://localhost:3004/applications'
      );

      dispatch(setExecutors(getExecutors.data));
      dispatch(setCustomers(getCustomers.data));
      dispatch(setApplications(getApplications.data));
    };

    fetchData();
  }, []);



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
          <Route path="*" element='НЕТУ ТАКОГО ' />
        </Routes>
      </div>
    </div>
  );
}

export default App;
