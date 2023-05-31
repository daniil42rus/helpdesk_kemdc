import React, { useEffect, useState } from 'react';
import { useHeading } from '../../hooks/useHeading';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/slices/filtersSlice';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Applications.module.scss';
import { Modal } from '../../components/Modal';
import { AddApplicatin } from '../../components/AddApplicatin';

export const Applications = () => {
  useHeading('Заявки');
  const [addAppModal, setAddAppModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.filters);
  const { applications } = useSelector((state) => state.data);
  const categories = ['Открытые', 'Все заявки', 'В работе', 'Архив'];
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryQuery = searchParams.get('category') || '';

  useEffect(() => {
    dispatch(setCategory(categories.indexOf(categoryQuery)));
  }, [categoryQuery]);

  const onClickCategoty = (id) => {
    setSearchParams({ category: categories[id] });
    dispatch(setCategory(id));
  };

  const filterApp = applications.filter((obj) => {
    switch (category) {
      case 0:
        if (obj.open && !obj.administrator) return obj;
        break;
      case 1:
        return obj;
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
      <div className={styles.optional}>
        <button
          className={styles.addBtn}
          onClick={() => setAddAppModal(!addAppModal)}
        >
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
        <button
          className={styles.addBtn}
          onClick={() => setFilterModal(!filterModal)}
        >
          <span>Сортировать</span>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_970_4146)">
              <path
                d="M1.33333 3.95818H3.61333C3.7922 4.61629 4.18264 5.19726 4.72444 5.61146C5.26623 6.02566 5.92927 6.25007 6.61125 6.25007C7.29323 6.25007 7.95627 6.02566 8.49806 5.61146C9.03986 5.19726 9.4303 4.61629 9.60917 3.95818H19.6667C19.8877 3.95818 20.0996 3.87039 20.2559 3.7141C20.4122 3.55782 20.5 3.34586 20.5 3.12485C20.5 2.90384 20.4122 2.69187 20.2559 2.53559C20.0996 2.37931 19.8877 2.29152 19.6667 2.29152H9.60917C9.4303 1.63341 9.03986 1.05244 8.49806 0.63824C7.95627 0.224043 7.29323 -0.000366211 6.61125 -0.000366211C5.92927 -0.000366211 5.26623 0.224043 4.72444 0.63824C4.18264 1.05244 3.7922 1.63341 3.61333 2.29152H1.33333C1.11232 2.29152 0.900358 2.37931 0.744078 2.53559C0.587797 2.69187 0.5 2.90384 0.5 3.12485C0.5 3.34586 0.587797 3.55782 0.744078 3.7141C0.900358 3.87039 1.11232 3.95818 1.33333 3.95818ZM6.61083 1.66652C6.89926 1.66652 7.18122 1.75205 7.42104 1.91229C7.66086 2.07253 7.84778 2.30029 7.95816 2.56677C8.06854 2.83325 8.09742 3.12647 8.04115 3.40936C7.98488 3.69225 7.84598 3.9521 7.64203 4.15605C7.43808 4.36 7.17823 4.49889 6.89534 4.55516C6.61245 4.61143 6.31923 4.58255 6.05275 4.47217C5.78628 4.3618 5.55852 4.17488 5.39827 3.93506C5.23803 3.69523 5.1525 3.41328 5.1525 3.12485C5.15294 2.73821 5.30673 2.36753 5.58012 2.09414C5.85352 1.82074 6.22419 1.66696 6.61083 1.66652Z"
                fill="#313A33"
              />
              <path
                d="M19.6667 9.16672H17.3867C17.2081 8.50846 16.8178 7.92728 16.2761 7.51291C15.7343 7.09854 15.0712 6.87402 14.3892 6.87402C13.7071 6.87402 13.044 7.09854 12.5023 7.51291C11.9605 7.92728 11.5702 8.50846 11.3917 9.16672H1.33333C1.11232 9.16672 0.900358 9.25452 0.744078 9.4108C0.587797 9.56708 0.5 9.77904 0.5 10.0001C0.5 10.2211 0.587797 10.433 0.744078 10.5893C0.900358 10.7456 1.11232 10.8334 1.33333 10.8334H11.3917C11.5702 11.4916 11.9605 12.0728 12.5023 12.4872C13.044 12.9016 13.7071 13.1261 14.3892 13.1261C15.0712 13.1261 15.7343 12.9016 16.2761 12.4872C16.8178 12.0728 17.2081 11.4916 17.3867 10.8334H19.6667C19.8877 10.8334 20.0996 10.7456 20.2559 10.5893C20.4122 10.433 20.5 10.2211 20.5 10.0001C20.5 9.77904 20.4122 9.56708 20.2559 9.4108C20.0996 9.25452 19.8877 9.16672 19.6667 9.16672ZM14.3892 11.4584C14.1007 11.4584 13.8188 11.3729 13.579 11.2126C13.3391 11.0524 13.1522 10.8246 13.0418 10.5581C12.9315 10.2917 12.9026 9.99843 12.9589 9.71555C13.0151 9.43266 13.154 9.17281 13.358 8.96885C13.5619 8.7649 13.8218 8.62601 14.1047 8.56974C14.3875 8.51347 14.6808 8.54235 14.9472 8.65273C15.2137 8.76311 15.4415 8.95002 15.6017 9.18985C15.762 9.42967 15.8475 9.71162 15.8475 10.0001C15.8471 10.3867 15.6933 10.7574 15.4199 11.0308C15.1465 11.3042 14.7758 11.4579 14.3892 11.4584Z"
                fill="#313A33"
              />
              <path
                d="M19.6667 16.0416H9.60917C9.4303 15.3835 9.03986 14.8026 8.49806 14.3884C7.95627 13.9742 7.29323 13.7498 6.61125 13.7498C5.92927 13.7498 5.26623 13.9742 4.72444 14.3884C4.18264 14.8026 3.7922 15.3835 3.61333 16.0416H1.33333C1.11232 16.0416 0.900358 16.1294 0.744078 16.2857C0.587797 16.442 0.5 16.654 0.5 16.875C0.5 17.096 0.587797 17.3079 0.744078 17.4642C0.900358 17.6205 1.11232 17.7083 1.33333 17.7083H3.61333C3.7922 18.3664 4.18264 18.9474 4.72444 19.3616C5.26623 19.7758 5.92927 20.0002 6.61125 20.0002C7.29323 20.0002 7.95627 19.7758 8.49806 19.3616C9.03986 18.9474 9.4303 18.3664 9.60917 17.7083H19.6667C19.8877 17.7083 20.0996 17.6205 20.2559 17.4642C20.4122 17.3079 20.5 17.096 20.5 16.875C20.5 16.654 20.4122 16.442 20.2559 16.2857C20.0996 16.1294 19.8877 16.0416 19.6667 16.0416ZM6.61083 18.3333C6.3224 18.3333 6.04045 18.2478 5.80063 18.0875C5.5608 17.9273 5.37389 17.6995 5.26351 17.4331C5.15313 17.1666 5.12425 16.8734 5.18052 16.5905C5.23679 16.3076 5.37568 16.0477 5.57964 15.8438C5.78359 15.6398 6.04344 15.5009 6.32633 15.4447C6.60922 15.3884 6.90244 15.4173 7.16891 15.5276C7.43539 15.638 7.66315 15.8249 7.82339 16.0648C7.98364 16.3046 8.06917 16.5865 8.06917 16.875C8.06851 17.2615 7.91465 17.6321 7.6413 17.9054C7.36795 18.1788 6.9974 18.3326 6.61083 18.3333Z"
                fill="#313A33"
              />
            </g>
            <defs>
              <clipPath id="clip0_970_4146">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      {addAppModal && (
        <Modal open={addAppModal} setOpen={setAddAppModal}>
          <AddApplicatin open={addAppModal} setOpen={setAddAppModal} />
        </Modal>
      )}

      {filterModal && (
        <Modal open={filterModal} setOpen={setFilterModal}></Modal>
      )}
      <>
        <ul className={styles.top}>
          {categories.map((item, id) => (
            <button
              key={id}
              onClick={(e) => onClickCategoty(id)}
              className={category === id ? `${styles.active}` : ''}
            >
              {item}
            </button>
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
