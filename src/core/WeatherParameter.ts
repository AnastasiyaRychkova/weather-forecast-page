import { WeatherCodeTable, WeatherCodeKeys } from "./WeatherCode";
import type { IWeatherParameter } from "./types.d";

/**
 * Температура в °C
 */
class Temperature implements IWeatherParameter
{
	value: number
	
	constructor( value: number )
	{
		this.value = value;
	}
	
	asString(): string
	{
		return `${this._sign}${Math.round( this.value )}°`;
	}

	private get _sign(): string
	{
		return this.value > 0
				? '+'
				: this.value < 0
					? '−'
					: '';
	}
}

/**
 * Количество осадков
 */
class Precipitation implements IWeatherParameter
{
	value: number;

	constructor( value: number )
	{
		this.value = value;
	}

	asString(): string {
		return Math.round( this.value ) + ' мм';
	}
}

/**
 * Скорость ветра с направлением в м/с
 */
class Wind implements IWeatherParameter
{
	value: number;
	private _direction?: number;

	constructor( value: number, directionAngle?: number )
	{
		this.value = value;
		this._direction = directionAngle;
	}

	asString(): string
	{
		return this._direction
				? Math.round( this.value ) + ' м/с, ' + this._angleToHorizonSide( this._direction )
				: Math.round( this.value ) + ' м/с,';
	}

	private _angleToHorizonSide( angle: number ): string
	{
		const directions = [ 'С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ' ];
		return directions[ Math.floor( ( angle + 22.5 ) % 360 / 45 ) ];
	}
}


/**
 * Код погоды
 * 
 * В строковом представлении возвращает Текстовое краткое описание.
 */
class WeatherCode implements IWeatherParameter
{
	value: number;

	constructor( code: number )
	{
		if( !(code in WeatherCodeTable) )
			throw new Error( 'Unknown weather code value: ' + code );
		
		this.value = code;
	}

	asString(): string {
		return WeatherCodeTable[ this.value as WeatherCodeKeys ];
	}
}

/**
 * Атмосферное давление
 * 
 * Принимает по дефолту `ГПа`, возвращает `мм рт ст`
 */
class Pressure implements IWeatherParameter
{
	/** Значение в мм рт ст */
	value: number;

	constructor( hPa: number )
	{
		this.value = this._hPaToMmHg( hPa );
	}

	private _hPaToMmHg( value: number ): number
	{
		return value * 0.750063755419211;
	}

	asString(): string {
		return Math.round( this.value ) + ' мм рт. ст.';
	}
}

/**
 * Универсальный параметр, который принимает значение и единицы измерения
 */
class WeatherParameter implements IWeatherParameter
{
	value: number;
	private _units: string;

	constructor( value: number, units: string )
	{
		this.value = value;
		this._units = units;
	}

	asString(): string {
		return Math.round( this.value ) + this._units;
	}
}


const WeatherParameters = {

	/**
	 * Температура в °C
	 */
	temperature( value: number ): IWeatherParameter
	{
		return new Temperature( value );
	},

	/** 
	 * Количество осадков
	 */
	precipitation( value: number ): IWeatherParameter
	{
		return new Precipitation( value );
	},

	/**
	 * Скорость ветра с направлением в м/с
	 */
	wind( value: number, directionAngle?: number ): IWeatherParameter
	{
		return new Wind( value, directionAngle );
	},

	/**
	 * Код погоды
	 * 
	 * В строковом представлении возвращает Текстовое краткое описание.
	 */
	weatherCode( value: number ): IWeatherParameter
	{
		return new WeatherCode( value );
	},

	/**
	 * Атмосферное давление
	 * 
	 * Принимает по дефолту `ГПа`, возвращает `мм рт ст`
	 */
	pressure( value: number ): IWeatherParameter
	{
		return new Pressure( value )
	},

	/**
	 * Универсальный параметр, который принимает значение и единицы измерения
	 */
	custom( value: number, units: string ): IWeatherParameter
	{
		return new WeatherParameter( value, units );
	},
}

export default WeatherParameters;