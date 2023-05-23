import React, { useEffect } from 'react';
import { useHeading } from '../../hooks/useHeading';
import styles from './Home.module.scss';
import { Calendar } from '../../components/Calendar';
import { MyApplicatios } from '../../components/MyApplicatios';
import { Profile } from '../../components/Profile';



export const Home = () => {
	useHeading('Главная');
	
	return (
		<div className={styles.home_content}>
			<div className={styles.welcome}>
				<div className={styles.welcome_content}>
					<h2 className={styles.hello}>Привет Станислав!</h2>
					<p className={styles.text}>
						Ничего не сработает, если не работаешь ты.
					</p>
					<span className={styles.jhon}>(Джон Вуден)</span>
					<span className={styles.nice}>Приятной работы!</span>
				</div>
				<img src="img/man.svg" alt="" />
			</div>
			<Calendar />
			<MyApplicatios />
			<Profile />
		</div>
	);
};
