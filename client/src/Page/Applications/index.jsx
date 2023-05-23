import React, { useEffect } from 'react';
import { useHeading } from '../../hooks/useHeading';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/slices/filtersSlice';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Applications.module.scss';

export const Applications = () => {
  useHeading('Заявки');

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
        if (obj.open && !obj.executor.id) return obj;
        break;
      case 2:
        if (obj.open && obj.executor.id) return obj;
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