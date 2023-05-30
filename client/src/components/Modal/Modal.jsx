import { useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addApplications } from '../../redux/slices/dataSlice';
import { WebSock } from '../WebSock/WebSock';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Modal = ({ open, setOpen }) => {
  const [department, setDepartment] = useState();
  const [room, setRoom] = useState();
  const [problems, setProblems] = useState();
  const [details, setDetails] = useState();
  const [urgency, setUrgency] = useState();

  const { status } = useSelector((status) => status.data);
  const { index } = useSelector((status) => status.data);

  const { updateApplications } = WebSock();
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
    await updateApplications();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <svg
          onClick={() => setOpen(!open)}
          height="200"
          viewBox="0 0 200 200"
          width="200"
        >
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
        <h3>Создать заявку</h3>
        <form action="">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option selected disabled>
              Выберите подразделение
            </option>
            <option value={'Диагностический центр'}>
              Диагностический центр
            </option>
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
      </div>
    </div>
  );
};
