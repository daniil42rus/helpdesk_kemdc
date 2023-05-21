import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setApplications } from '../../redux/slices/dataSlice';

export const WebSock = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:5001');
    socket.current.onopen = () => {};

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      dispatch(setApplications(message));
    };
    socket.current.onclose = () => {
      console.log('Socket закрыт');
      alert('Socket закрыт');
      alert('Обновите страницу');
    };
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка');
      alert('Socket произошла ошибка');
      alert('Обновите страницу');
    };
  }, []);

  const updateApplications = () => {
    const message = {
      id: Date.now(),
      event: 'applications',
    };
    socket.current.send(JSON.stringify(message));
  };

  return { updateApplications };
};
