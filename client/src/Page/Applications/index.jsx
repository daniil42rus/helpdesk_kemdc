import React, { useEffect, useState } from 'react';
import { useHeading } from '../../hooks/useHeading';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/slices/filtersSlice';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Applications.module.scss';
import { Modal } from '../../components/Modal/Modal';

export const Applications = () => {
  useHeading('Заявки');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.filters);
  const { applications } = useSelector((state) => state.data);
  const categories = ['Все заявки', 'Открытые', 'В работе', 'Архив'];
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryQuery = searchParams.get('filter') || '';

  useEffect(() => {
    dispatch(setCategory(categories.indexOf(categoryQuery)));
  }, [categoryQuery]);

  const onClickCategoty = (id) => {
    setSearchParams({ filter: categories[id] });
    dispatch(setCategory(id));
  };

  const filterApp = applications.filter((obj) => {
    switch (category) {
      case 0:
        return obj;
      case 1:
        if (obj.open && !obj.administrator) return obj;
        break;
      case 2:
        if (obj.open && obj.administrator) return obj;
        break;
      case 3:
        if (!obj.open) return obj;
        break;
      default:
        break;
    }

    return false;
  });
  return (
    <>
      <button className={styles.addBtn} onClick={() => setOpen(!open)}>
        <span>Создать заявку</span>
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.874 14.426V11.204H5.67V9.926H8.874V6.704H10.17V9.926H13.392V11.204H10.17V14.426H8.874Z"
            fill="#313A33"
          />
          <rect
            x="0.5"
            y="1"
            width="19"
            height="19"
            rx="9.5"
            stroke="#6EA079"
          />
        </svg>
      </button>
      {open && <Modal open={open} setOpen={setOpen}></Modal>}
      <>
        <ul className={styles.top}>
          {categories.map((item, id) => (
            <li
              key={id}
              onClick={(e) => onClickCategoty(id)}
              className={category === id ? `${styles.active}` : ''}
            >
              {item}
            </li>
          ))}
        </ul>
        <span>Всего заявок {filterApp.length}</span>
      </>
      <ul className={styles.list}>
        {filterApp.map((obj) => (
          <Link key={obj.id} to={`/application/${obj.id}`}>
            <li key={obj.id}>
              <span className={styles.id}>Заявка {obj.id}</span>
              <span className={styles.department}>
                {obj.application.department}
              </span>
              <span className={styles.problems}>
                {obj.application.problems} {obj.application.problemsDetails}{' '}
              </span>
              <span className={styles.room}>
                Кабинет {obj.application.room}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};
