import React from 'react';
import styles from './MyApplicatios.module.scss';
import { useSelector } from 'react-redux';

export const MyApplicatios = () => {
	const applications = useSelector((state) => state.data.applications);
	const MyOpenApplications = applications.filter((obj) => {
		if (obj.open && obj.executor.name === 'Сапрыкин Станислав Евгеньевич') {
			return obj;
		}
		return false;
	});

	const onCloseApplications = (obj) => {
		alert(`НЕТ ${obj.id}`);
	};

	return (
		<div className={styles.myApplicatios}>
			<h2>Мои заявки</h2>
			<ul>
				<li>
					<span>№ заявки</span>
					<span>Подразделение</span>
					<span>Проблемма</span>
					<span>Кабинет</span>
				</li>
			</ul>

			<ul>
				{MyOpenApplications.map((obj) => (
					<li key={obj.id}>
						<span>{obj.id}</span>
						<span>{obj.application.department}</span>
						<span>
							{obj.application.problems} {obj.application.problemsDetails}
						</span>
						<span>{obj.application.roomNumber}</span>
						<button onClick={()=>onCloseApplications(obj)}>Закрыть заявку</button>
					</li>
				))}
			</ul>
		</div>
	);
};
