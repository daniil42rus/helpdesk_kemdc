import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeading } from '../redux/slices/headingSlice';

export const useHeading = (name) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setHeading(name));
	}, []);
};
