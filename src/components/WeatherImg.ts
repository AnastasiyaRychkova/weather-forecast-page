import type { WeatherCodeKeys } from '../core/WeatherCode';
import sun from '../img/slight_touch_happyday.svg';
import partlyCloudy from '../img/partly_cloudy.svg';
import cloudy from '../img/cloudy.svg';
import rainy from '../img/rainy.svg';
import rainStorm from '../img/rain_storm.svg';
import snowy from '../img/snowy.svg';
import storm from '../img/night_storm.svg';

const WeatherImg: {[key in WeatherCodeKeys]: string } = {
	0: sun,
	1: partlyCloudy,
	2: partlyCloudy,
	3: cloudy,
	45: snowy,
	48: snowy,
	51: rainy,
	53: rainy,
	55: rainy,
	56: rainy,
	57: rainy,
	61: rainy,
	63: rainy,
	65: rainy,
	66: rainy,
	67: rainy,
	71: snowy,
	73: snowy,
	75: snowy,
	77: snowy,
	80: rainy,
	81: rainy,
	82: rainy,
	85: snowy,
	86: snowy,
	95: storm,
	96: rainStorm,
	99: rainStorm,
}

export default WeatherImg;