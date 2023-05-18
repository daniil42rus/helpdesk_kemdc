import React from 'react';
import styles from './MyApplicatios.module.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const MyApplicatios = () => {
	const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN;
	const applications = useSelector((state) => state.data.applications);
	const MyOpenApplications = applications.filter((obj) => {
		if (obj.open && obj.executor.name === 'Сапрыкин Станислав Евгеньевич') {
			return obj;
		}
		return false;
	});

	const onCloseApplications = async (obj) => {
		try {
			const anwser = `
				${obj.application.department} 
		  Номер кабинета: ${obj.application.roomNumber}       
		  Срочность:  ${obj.application.urgency}       
		  Отправитель:  ${obj.customer.firstName}      
		  В чем проблема:   ${obj.application.problems}      
		  Описание:   ${obj.application.problemsDetails} 
		  id заявки:  ${obj.id}       
			`;

			const anwser1 = `Вашу заявку с ID ${obj.id} закрыл ${obj.executor.name} \nЗаявка закрыта ${obj.closed.day}.${obj.closed.month}.${obj.closed.year} в ${obj.closed.hours}:${obj.closed.minutes}`;

			await axios.post(
				`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${511869236}&text=${anwser1}`
			);

			alert(`Заявка ID:${obj.id} закртыа`);
		} catch (error) {
			alert('Ошибка');
			console.log(error);
		}
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
						<button onClick={() => onCloseApplications(obj)}>
							Закрыть заявку
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
