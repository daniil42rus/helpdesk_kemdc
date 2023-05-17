import React from 'react';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';

export const Header = () => {
	const heading = useSelector((state) => state.heading.value);

	return (
		<header className={styles.header}>
			<h1>{heading}</h1>
			<input type="search"></input>
			<div>
				<img src="img/bell.svg" alt="" />
				<span>Сапрыкин Станислав</span>
			</div>
		</header>
	);
};
