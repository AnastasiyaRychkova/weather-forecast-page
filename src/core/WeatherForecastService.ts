import WeatherForecast from "./WeatherForecast";
import WeatherForecastRequest from "./WeatherForecastRequest";
import type { CityType } from "./types";

const WeatherForecastService = {
	async load( city: CityType ): Promise<WeatherForecast>
	{
		const request = new WeatherForecastRequest( city );
		const forecastScheme = await request.send();
		return new WeatherForecast( forecastScheme );
	},
}

export default WeatherForecastService;