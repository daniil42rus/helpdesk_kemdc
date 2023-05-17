import React, { useEffect, useRef } from 'react';
import { useHeading } from '../../hooks/useHeading';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import QueryString from 'qs';

export const ApplicationCard = () => {
  const applications = useSelector((state) => state.data.applications);
  const app = useSelector((state) => state.selectApp.applications);
  useHeading(`Заявка №${app.id}`);

  const isMounted = useRef(false);
  const navigage = useNavigate();

  useEffect(() => {
    const fetchId = async () => {
      const params = QueryString.parse(window.location.search.substring(1));
      const aq = applications.filter((obj) => {
         if (Number(obj.id) === Number(params.id)) return obj;
      });

      console.log(aq);

      const qeryString = QueryString.stringify({
        id: app.id,
      });

      navigage(`?${qeryString}`);
    };

    fetchId();
  }, []);

  return <div> {}</div>;
};
