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
  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const { status } = useSelector((status) => status.data);

  const dispatch = useDispatch();
  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);

  const application = {
    application: { department, room, problems, details, urgency },
    client: { name, phone },
  };

  const onClickСreate = async () => {
    await dispatch(addApplications(application));
    await WebSocketMessage('applications');
  };
  return (
    <div className={styles.content}>
      <h3>Создать заявку</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <select
          required
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Выберите подразделение</option>
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
          placeholder="Комната"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="В чем проблема"
          value={problems}
          onChange={(e) => setProblems(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Детали"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          required
        >
          <option value="">Срочность</option>
          <option value={'Срочно (1-2 часа)'}>Срочно (1-2 часа)</option>
          <option value={'В течении дня'}>В течении дня</option>
          <option value={'В течении 2х-3х дней'}>В течении 2х-3х дней</option>
          <option value={'В течении недели'}>В течении недели</option>
        </select>
        <input
          type="text"
          placeholder="ФИО"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Номер телефона"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <div className={styles.btns}>
          <button type="submit" onClick={() => onClickСreate()}>
            Создать заявку
          </button>
          <button onClick={() => setOpen(!open)}>Отменить</button>
        </div>
      </form>
    </div>
  );
};
