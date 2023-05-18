import React, { useEffect, useState } from 'react';
import { useHeading } from '../../hooks/useHeading';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
	ApplicatiosInfo,
	ApplicatiosInfoSkeleton,
} from '../../components/ApplicatiosInfo';

export const ApplicationCard = () => {
	const { id } = useParams();

	const [app, setApp] = useState(false);

	useHeading(`Заявка №${id}`);

	useEffect(() => {
		const fetchApp = async () => {
			const selectApp = await axios.get(
				`http://localhost:3004/applications?id=${id}`
			);
			setApp(selectApp.data[0]);
			if (selectApp.data[0]) {
			}
		};

		fetchApp();
	}, [id]);

	return (
		<>{app ? <ApplicatiosInfo app={app} /> : <ApplicatiosInfoSkeleton />}</>
	);
};
