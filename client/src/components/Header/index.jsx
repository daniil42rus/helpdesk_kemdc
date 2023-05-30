import React, { useState } from 'react';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';

export const Header = () => {
	const heading = useSelector((state) => state.heading.value);
	const [searchValue, setSearchValue] = useState('');

	const { user } = useSelector((status) => status.auth);



	return (
		<header className={styles.header}>
			<h1>{heading}</h1>
			<input
				type="search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				placeholder={`Поиск`}
			></input>
			<div>
				<img src="img/bell.svg" alt="" />
				<span>{user.name}</span>
			</div>
		</header>
	);
};
