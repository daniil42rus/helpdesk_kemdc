import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addApplications } from '../../redux/slices/dataSlice';
import styles from './AddApplicatin.module.scss';

export const AddApplicatin = ({ open, setOpen }) => {
  const { WebSocketMessage } = useContext(AppContext);

  const [department, setDepartment] = useState();
  const [room, setRoom] = useState();
  const [problems, setProblems] = useState();
  const [details, setDetails] = useState();
  const [urgency, setUrgency] = useState();

  const { status } = useSelector((status) => status.data);

  const dispatch = useDispatch();
  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);

  const application = {
    application: { department, room, problems, details, urgency },
  };

  const onClickСreate = async () => {
    await dispatch(addApplications(application));
    await WebSocketMessage('applications');
  };
  return (
    <>
      <h3>Создать заявку</h3>
      <form action="">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option selected disabled>
            Выберите подразделение
          </option>
          <option value={'Диагностический центр'}>Диагностический центр</option>
          <option value={'1 поликлиника'}>1 поликлиника</option>
          <option value={'2 поликлиника'}>2 поликлиника</option>
          <option value={'3 поликлиника'}>3 поликлиника</option>
          <option value={'4 поликлиника'}>4 поликлиника</option>
          <option value={'10 поликлиника'}>10 поликлиника</option>
          <option value={'Дарвина'}>Дарвина</option>
          <option value={'Женская консультация'}>Женская консультация</option>
          <option value={'ТП'}>ТП</option>
          <option value={'ЦМР'}>ЦМР</option>
        </select>

        <input
          type="text"
          placeholder="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type="text"
          placeholder="problems"
          value={problems}
          onChange={(e) => setProblems(e.target.value)}
        />
        <input
          type="text"
          placeholder="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <input
          type="text"
          placeholder="urgency"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
        />
      </form>

      <div className={styles.btns}>
        <button onClick={() => onClickСreate()}>Создать заявку</button>
        <button onClick={() => setOpen(!open)}>Отменить</button>
      </div>
    </>
  );
};
