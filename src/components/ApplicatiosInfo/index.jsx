import React from 'react';
import ContentLoader from 'react-content-loader';

export const ApplicatiosInfo = ({ app }) => {
	return (
		<>
			<div>{app.id}</div>
			<div>{app.open}</div>
			<div>{app.application.department}</div>
			<div>{app.application.roomNumber}</div>
		</>
	);
};

export const ApplicatiosInfoSkeleton = () => {
	return (
		<ContentLoader
			speed={2}
            // width={1180}
            // height={510}
			viewBox="0 0 1180 510"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="0" y="0" rx="20" ry="20" width="580" height="470" />
			<rect x="600" y="0" rx="10" ry="10" width="150" height="20" />
			<rect x="600" y="35" rx="20" ry="20" width="310" height="228" />
			<rect x="930" y="0" rx="10" ry="10" width="150" height="20" />
			<rect x="930" y="35" rx="20" ry="20" width="250" height="228" />
			<rect x="600" y="280" rx="20" ry="20" width="580" height="189" />
			<rect x="600" y="480" rx="10" ry="10" width="150" height="30" />
			<rect x="770" y="480" rx="10" ry="10" width="150" height="30" />
			<rect x="940" y="480" rx="10" ry="10" width="150" height="30" />
		</ContentLoader>
	);
};
