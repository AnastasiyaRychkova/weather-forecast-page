import React from 'react';


const CitySearch = () => {
	return (
		<div className="city-search">
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