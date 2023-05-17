import React, { useEffect, useState } from 'react';
import { useHeading } from '../../hooks/useHeading';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ApplicationCard = () => {
  const applications = useSelector((state) => state.data.applications);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [app, setApp] = useState({});
  // const [app, setApp] = useState({
  //   id: false,
  //   open: false,
  //   application: {
  //     department: false,
  //     roomNumber: false,
  //     problems: false,
  //     problemsDetails: false,
  //     urgency: false,
  //   },
  //   customer: { firstName: false, id: false },
  //   executor: {
  //     name: false,
  //     id: false,
  //     nickName: false,
  //   },
  //   closed: {
  //     day: false,
  //     month: false,
  //     year: false,
  //     hours: false,
  //     minutes: false,
  //     date: false,
  //   },
  //   applicationDate: {
  //     day: false,
  //     month: false,
  //     year: false,
  //     hours: false,
  //     minutes: false,
  //     date: false,
  //   },
  // });

  useHeading(`Заявка №${id}`);
  // useEffect(() => {
  //   const selectApp = applications.filter((obj) => {
  //     if (Number(obj.id) === Number(id)) return obj;
  //     return false;
  //   });
  //   if (typeof selectApp[0] === 'object') {
  //     setApp(selectApp[0]);
  //   }
  // }, [applications, id]);

  useEffect(() => {
    setIsLoading(true);
    const fetchApp = async () => {
      const selectApp = await axios.get(
        `http://localhost:3004/applications?id=${id}`
      );
      setApp(selectApp.data[0]);
      if (selectApp.data[0]) {
        setIsLoading(false);
      }
    };

    fetchApp();
  }, [id]);

  return (
    <>
      {!isLoading && (
        <>
          <span>{app.id}</span>
          <span>{app.open}</span>
          <span>{app.application.department}</span>
          <span>{app.application.roomNumber}</span>
        </>
      )}
    </>
  );
};
