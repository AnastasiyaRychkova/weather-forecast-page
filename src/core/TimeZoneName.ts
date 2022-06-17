const TimeZoneName = {
	'-12': 'Etc/GMT+12',
	'-11': 'Pacific/Midway',
	'-10': 'America/Adak',
	'-9': 'Pacific/Gambier',
	'-8': 'America/Anchorage',
	'-7': 'America/Los_Angeles',
	'-6': 'America/Denver',
	'-5': 'America/Chicago',
	'-4': 'America/New_York',
	'-3': 'America/Sao_Paulo',
	'-2': 'America/Godthab',
	'-1': 'Atlantic/Cape_Verde',
	'0': 'Africa/Abidjan',
	'1': 'Europe/London',
	'2': 'Europe/Berlin',
	'3': 'Europe/Moscow',
	'4': 'Europe/Saratov',
	'5': 'Asia/Yekaterinburg',
	'6': 'Asia/Omsk',
	'7': 'Asia/Barnaul',
	'8': 'Asia/Irkutsk',
	'9': 'Asia/Yakutsk',
	'10': 'Asia/Vladivostok',
	'11': 'Pacific/Bougainville',
	'12': 'Asia/Anadyr',
}

export type TimeZoneOffset = keyof typeof TimeZoneName;

export default TimeZoneName;