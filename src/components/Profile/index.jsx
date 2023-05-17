import React from 'react';
import styles from './Profile.module.scss';
import { Link } from 'react-router-dom';

export const Profile = () => {
	return (
		<div className={styles.profile}>
			<div className={styles.top}>
				<h2>Профиль</h2>
				<Link to="/">Редактировать профиль</Link>
			</div>
			<div className={styles.info}>
				<div className={styles.infoContent}>
					<span className={styles.infoLeft}>Почта</span>
					<span>se.saprykin@inbox.ru</span>
				</div>
				<div className={styles.infoContent}>
					<span className={styles.infoLeft}>Место работы</span>
					<span>
						ГАУЗ Клинический консультативно-диагностический центр им. И.А.
						Колпинского
					</span>
				</div>
				<div className={styles.infoContent}>
					<span className={styles.infoLeft}>Должность</span>
					<span>Начальник отдела ИТ</span>
				</div>
			</div>
		</div>
	);
};
