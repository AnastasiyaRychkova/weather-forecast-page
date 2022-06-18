export function timeSting( date: Date ): string
{
	return date.toLocaleTimeString( [], {
		hour: '2-digit',
		minute: '2-digit',
	} );
}

export function dateString( date: Date ): string
{
	return date.toLocaleDateString([], {dateStyle: 'short'})
}

export function weekDayString( date: Date ): string
{
	return date.toLocaleDateString( 'ru', {weekday: 'long'} );
}

export function weekDayShortString( date: Date ): string
{
	return date.toLocaleDateString( 'ru', {weekday: 'short'} );
}

export function dayString( date: Date ): string
{
	return date.toLocaleDateString( 'ru', {day: 'numeric', month: 'long'} );
}