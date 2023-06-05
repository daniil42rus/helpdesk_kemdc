import React from 'react';
import styles from './Employees.module.scss';
import { useSelector } from 'react-redux';
import { AdminInfo } from '../../components/AdminInfo';

export const Employees = () => {
  const { administrators } = useSelector((state) => state.data);

  return (
      <ul className={styles.adminList}>
        {administrators.map((admin) => (
          <li>
            <AdminInfo user={admin} />
          </li>
        ))}
      </ul>
  );
};
