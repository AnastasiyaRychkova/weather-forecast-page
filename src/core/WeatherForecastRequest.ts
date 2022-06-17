import TimeZoneName, { TimeZoneOffset } from "./TimeZoneName";
import type { ForecastResponse, WeatherRequestOptions } from "./types.d";


/**
 * Запрос на сервер, предоставляющий информацию о прогнозе погоды.
 * 
 * Принимает в конструкторе координаты города, для которого необходимо запросить прогноз,
 * и формирует строку запроса, устанавливая в качестве часового пояса текущее значение с устройства.
 * 
 * Отправка запроса не сервер осуществляется методом `send`.
 */
class WeatherForecastRequest
{
	private readonly _options: WeatherRequestOptions;


	constructor( options: WeatherRequestOptions )
	{
		this._options = options;
	}

	/**
	 * Отправить запрос на сервер
	 * @returns Объект прогноза погоды
	 */
	async send(): Promise<ForecastResponse>
	{
		const response = await fetch( this._createURL() );
		if( !response.ok )
			throw new Error( `Request error (${response.status}): ${response.statusText}` );
		const responseObject = await response.json();
		return {
			hourly: {
				time: responseObject.hourly.time,
				temperature: responseObject.hourly.temperature_2m,
				apparentTemperature: responseObject.hourly.apparent_temperature,
				precipitation: responseObject.hourly.precipitation,
				relativeHumidity: responseObject.hourly.relativehumidity_2m,
				sealevelPressure: responseObject.hourly.pressure_msl,
				weathercode: responseObject.hourly.weathercode,
				windSpeed: responseObject.hourly.windspeed_10m,
				windDirection: responseObject.hourly.winddirection_10m,
				windGusts: responseObject.hourly.windgusts_10m,
			},
			daily: {
				time: responseObject.daily.time,
				weathercode: responseObject.daily.weathercode,
				maxTemperature: responseObject.daily.temperature_2m_max,
				minTemperature: responseObject.daily.temperature_2m_min,
				maxApparentTemperature: responseObject.daily.apparent_temperature_max,
			},
		}
	}

	private _createURL(): string
	{
		const url = new URL( 'https://api.open-meteo.com/v1/forecast' );
		
		url.searchParams.set( 'latitude', this._options.latitude.toString() );
		url.searchParams.set( 'longitude', this._options.longitude.toString() );
		url.searchParams.set( 'hourly', [
			'temperature_2m',
			'apparent_temperature',
			'precipitation',
			'relativehumidity_2m',
			'pressure_msl',
			'weathercode',
			'windspeed_10m',
			'winddirection_10m',
			'windgusts_10m',
			].join( ',' ) );
		url.searchParams.set( 'daily', [
			'weathercode',
			'temperature_2m_max',
			'temperature_2m_min',
			'apparent_temperature_max',
			].join( ',' ) );
		url.searchParams.set( 'windspeed_unit', 'ms' );
		url.searchParams.set( 'timezone', this._currentTimeZoneName() );
		
		return url.toString().replaceAll( '%2C', ',' );
	}

	private _currentTimeZoneName(): string
	{
		const hoursOffset = Math.floor( -1 * new Date().getTimezoneOffset() / 60 );
		return TimeZoneName[ hoursOffset <= 12 && hoursOffset >= -12
				? hoursOffset.toString() as TimeZoneOffset
				: '0' ];
	}
}



export default WeatherForecastRequest;