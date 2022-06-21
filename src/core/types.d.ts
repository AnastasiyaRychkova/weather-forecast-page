/** Почасовой прогноз погоды на 7 дней */
export type HourlyForecastResponse = {
	/** ВременнЫе метки */
	time: Date[],

	/** Температура */
	temperature: number[],

	/** Ощущаемая температура */
	apparentTemperature: number[],

	/** Количество выпавших осадков за час */
	precipitation: number[],

	/** Относительная влажность */
	relativeHumidity: number[],

	/** Давление */
	sealevelPressure: number[],

	/** Код погоды */
	weathercode: number[],

	/** Скорость ветра */
	windSpeed: number[],

	/** Направление ветра */
	windDirection: number[],

	/** Скорость порывов ветра */
	windGusts: number[],
}

/** Прогноз погоды на 7 дней */
export type DailyForecastResponse = {
	/** ВременнЫе метки */
	time: Date[],

	/** Код погоды */
	weathercode: number[],

	/** Максимальная температура */
	maxTemperature: number[],

	/** Минимальная температура */
	minTemperature: number[],

	/** Максимальная температура */
	maxApparentTemperature: number[],
}

/** Объектное представление прогноза погоды */
export type ForecastResponse = {
	/** Почасовой прогноз на 7 дней */
	hourly: HourlyForecastResponse,

	/** Подневной прогноз на 7 дне  */
	daily: DailyForecastResponse,
}

/**
 * Параметр погодных условий
 */
export interface IWeatherParameter
{
	/** Числовое значение */
	value: number

	/** Строковое представление вместе с единицами измерения */
	asString(): string
}

/**
 * Погода в данный момент
 */
export type CurrentWeather = {
	/** Время прогноза */
	time: Date,

	/** Код погоды */
	weatherCode: IWeatherParameter,

	/** Температура в C° */
	temperature: IWeatherParameter,

	/** Ощущаемая температура в C° */
	apparentTemperature: IWeatherParameter,

	/** Количество осадков */
	precipitation: IWeatherParameter,

	/** Относительная влажность в % */
	humidity: IWeatherParameter,

	/** Давление в мм рт. ст. */
	pressure: IWeatherParameter,

	/** Скорость ветра в м/с */
	wind: IWeatherParameter,

	/** Порывы ветра */
	windGusts: IWeatherParameter,
}

/**
 * Прогноз погоды на весь день
 */
export type DailyForecast = {
	/** Время прогноза */
	time: Date,

	/** Средняя ощущаемая температура за день */
	apparentTemperature: IWeatherParameter,

	/** Код погоды */
	weatherCode: IWeatherParameter,

	/** Минимальная температура за день */
	minTemperature: IWeatherParameter,

	/** Максимальная температура за день */
	maxTemperature: IWeatherParameter,
}

export type CityType = {
	latitude: number,
	longitude: number,
}


export type WeatherRequestOptions = CityType;

export interface IWeatherForecast
{
	/** Погода последнего часа */
	readonly currentWeather: CurrentWeather;

	/** Прогноз погоды на неделю */
	readonly weeklyForecast: DailyForecast[];
}