import React, { useState } from 'react';
import { useHeading } from '../../hooks/useHeading';
import styles from './Applications.module.scss';

export const Applications = () => {
	useHeading('Заявки');

	const [active, setActive] = useState(false);

	return (
		<>
			<div className={styles.top}>
				<button>Все заявки</button>
				<button>Открытые</button>
				<button>В работе</button>
				<button>Архив </button>
			</div>
		</>
	);
};
