import React, {FC} from 'react';

interface IProps {
	
	className?: string,
}

const CitySearch: FC<IProps> = ({
	
}) => {
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