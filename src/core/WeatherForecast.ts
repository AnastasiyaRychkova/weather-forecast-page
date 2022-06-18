import type {
	ForecastResponse,
	HourlyForecastResponse,
	CurrentWeather,
	DailyForecast,
	DailyForecastResponse,
} from './types.d';
import WeatherParameters from './WeatherParameter';


/**
 * Прогноз погоды
 */
class WeatherForecast
{
	/** Погода последнего часа */
	readonly currentWeather: CurrentWeather;

	/** Прогноз погоды на неделю */
	readonly weeklyForecast: DailyForecast[];

	constructor( response: ForecastResponse )
	{
		this.currentWeather = this._makeCurrentWeather( response.hourly );
		this.weeklyForecast = this._makeWeeklyForecast( response.daily );
	}

	/**
	 * Создать объект погоды параметров последнего часа из ответа сервера
	 * @param response Почасовой прогноз
	 * @returns Объект погоды параметров последнего часа
	 */
	private _makeCurrentWeather( response: HourlyForecastResponse ): CurrentWeather
	{
		if( response.time.length < 168 )
			throw new Error( 'The object contains a weather forecast for less than 7 days' );
			
		const i = this._getCurrentTimePeriodIndex( response );
		return {
			time: new Date( response.time[i] ),
			weatherCode: WeatherParameters.weatherCode( response.weathercode[i] ),
			temperature: WeatherParameters.temperature( response.temperature[i] ),
			apparentTemperature: WeatherParameters.temperature( response.apparentTemperature[i] ),
			precipitation: WeatherParameters.precipitation( response.precipitation[i] ),
			humidity: WeatherParameters.custom( response.relativeHumidity[i], '%' ),
			pressure: WeatherParameters.pressure( response.sealevelPressure[i] ),
			wind: WeatherParameters.wind( response.windSpeed[i], response.windDirection[i] ),
			windGusts: WeatherParameters.wind( response.windGusts[i] ),
		};
	}

	/**
	 * Определить индекс текущего часа из ответа сервера
	 * @param response Почасовой прогноз погоды
	 * @returns Индекс текущего часа
	 */
	private _getCurrentTimePeriodIndex( response: HourlyForecastResponse ): number
	{
		const currentTime = new Date();
		const currentTimeSecondsOffset = ( currentTime.getTime() - new Date( response.time[0] ).getTime() ) / 1000;
		if( currentTimeSecondsOffset < 0 )
			throw new Error( 'Hourly weather forecast does not contain current weather data' );

		return Math.trunc( currentTimeSecondsOffset / 3600 );
	}

	/**
	 * Создать из ответа сервера прогноз погоды на 7 дней
	 * @param response Подневной прогноз погоды
	 * @returns Массив прогнозов погоды на 7 дней
	 */
	private _makeWeeklyForecast( response: DailyForecastResponse ): DailyForecast[]
	{
		if( response.time.length < 7 )
			throw new Error( 'The object contains a weather forecast for less than 7 days' );

		const forecast: DailyForecast[] = [];
		for( let i = 0; i < 7; i++ )
			forecast.push( this._makeDailyForecast( response, i ) );

		return forecast;
	}

	/**
	 * Создать из ответа сервера прогноз погоды на один день
	 * @param response Подневной прогноз погоды
	 * @param dayIndex Индекс дня в наборе дней [0;6]
	 * @returns Прогноз погоды на весь день
	 */
	private _makeDailyForecast( response: DailyForecastResponse, dayIndex: number ): DailyForecast
	{
		return {
			time: new Date( response.time[ dayIndex ] ),
			weatherCode: WeatherParameters.weatherCode( response.weathercode[ dayIndex ] ),
			minTemperature: WeatherParameters.temperature( response.minTemperature[ dayIndex ] ),
			maxTemperature: WeatherParameters.temperature( response.maxTemperature[ dayIndex ] ),
			apparentTemperature: WeatherParameters.temperature( response.maxApparentTemperature[ dayIndex ] ),
		};
	}


}



export default WeatherForecast;