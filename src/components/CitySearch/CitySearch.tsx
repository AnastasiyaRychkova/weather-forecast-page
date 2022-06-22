import React from 'react';

interface IProps {
	className?: string,
}

const CitySearch = ({ className }:IProps) => {
	return (
		<div className={className || ''}>
			<input
				className="search-input"
				type="search"
				name="city_search"
				id="city_search_input"
				placeholder='Санкт-Петербург'
				/>
		</div>
	);
};

export default CitySearch;