import React, { useState } from 'react';
import { Calendar as RCalendar } from 'react-calendar';
import './calendar.css'
export const Calendar = () => {
	const [value, onChange] = useState(new Date());
	return <RCalendar onChange={onChange} value={value} />;
};
