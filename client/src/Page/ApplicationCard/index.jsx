import React, { useEffect, useState } from 'react';
import { useHeading } from '../../hooks/useHeading';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ApplicatiosInfo,
  ApplicatiosInfoSkeleton,
} from '../../components/ApplicatiosInfo';
import { useSelector } from 'react-redux';

export const ApplicationCard = () => {
  const { id } = useParams();
  const [app, setApp] = useState(0);
  useHeading(`Заявка №${id}`);

  // useEffect(() => {
  //   const fetchApp = async () => {
  //     const selectApp = await axios.get(
  //       `http://localhost:3004/applications?id=${id}`
  //     );
  //     setApp(selectApp.data);

  //     //   if (app === undefined) {
  //     //     console.log('da');
  //     //   }
  //   };
  //   fetchApp();
  // }, [id]);

  const applications = useSelector((state) => state.data.applications);
  useEffect(() => {
    if (applications.length) {
      const selApp = applications.filter(
        (obj) => Number(obj.id) === Number(id)
      );

      if (selApp.length) {
        setApp(selApp);
      }
    }
  }, [applications, id]);


  return (
    <>{app ? <ApplicatiosInfo app={app} /> : <ApplicatiosInfoSkeleton />}</>
  );
};
