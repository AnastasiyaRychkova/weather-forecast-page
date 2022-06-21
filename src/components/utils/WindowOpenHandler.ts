import { useRef, useEffect } from "react";

type Px = number;
type Em = number;

type SwipeCoordinates = {
	startX: Px,
	startY: Px,
	endY: Px,
	dy: Px,
	maxDy: number,
}

type ElemState = {
	isOpen: boolean,
	translateY: Px,
	isDrag: boolean,
}

const MOBILE_WIDTH = 680;
const COS45 = 0.7;

const PosYRegExp = /matrix\(1, 0, 0, 1, 0, (-?\d+)/;


function useVerticalOpening<T extends HTMLElement>( threshold: Em )
{
	const ref = useRef<T>( null );
	const coordinates = useRef<SwipeCoordinates>( {
		startX: 0,
		startY: 0,
		endY: 0,
		dy: 0,
		maxDy: 0,
	} ).current;
	const state = useRef<ElemState>( {
		isOpen: false,
		translateY: 0,
		isDrag: false,
	} ).current;


	useEffect( () => {
		const elem = ref.current;
		if( !elem )
			return;

		/**
		 * Обработчик поднятия пальца с экрана
		 * @param event Событие касания
		 */
		const onTouchEnd = ( event: TouchEvent ) => {
			document.removeEventListener( 'touchmove', onTouchMove );
			document.removeEventListener( 'touchend', onTouchEnd );
			const thresholdPx = emToPx( threshold, elem );

			if( isThresholdCrossed( thresholdPx, coordinates, state ) )
			{
				state.isOpen = !state.isOpen;
				elem.setAttribute( 'data-open', String( state.isOpen ) );
			}
			state.isDrag = false;
			elem.style.removeProperty( 'transform' );
			elem.style.removeProperty( 'transition' );
			elem.style.removeProperty( 'height' );
		}
		
		/**
		 * Обработчик ведения пальца по экрану на всем документе
		 * @param event Событие касания
		 */
		const onTouchMove = ( event: TouchEvent ) => {
			if( isMovingAvailable( event ) )
			{
				onTouchEnd( event );
				return;
			}
			if( !state.isDrag )
			{
				if( isHorizontalTouchMove( event, coordinates ) ) // Горизонтальная прокрутка
				{
					onTouchEnd( event );
					return;
				}
				state.isDrag = true;
			}
			coordinates.endY = currentY( event );
			coordinates.dy = coordinates.endY - coordinates.startY;
			elem.style.transform = `matrix(1, 0, 0, 1, 0, ${validTranslateY( coordinates, state )})`;
		}

		/**
		 * Обработчик касания пальца
		 * @param event Событие касания
		 */
		const onTouchStart = ( event: TouchEvent ) => {
			if( isMovingAvailable( event ) )
				return;

			coordinates.startY = currentY( event );
			coordinates.startX = currentX( event );
			coordinates.endY = coordinates.startY;
			coordinates.dy = 0;
			state.translateY = state.isOpen ? translateY( elem ) : 0;
			coordinates.maxDy = availableOffset( elem, state );
			elem.style.transition = 'none';
			document.addEventListener( 'touchmove', onTouchMove );
			document.addEventListener( 'touchend', onTouchEnd );
		}

		// ----------
		elem.addEventListener( 'touchstart', onTouchStart );

		return () => {
			elem.removeEventListener( 'touchstart', onTouchStart );
		}
	}, [coordinates, threshold, state] );


	return ref;
}

/**
 * Смещение объекта по оси Y в px с учетом его высоты, чтобы не отрывать вверх нижнюю грань объекта 
 * от нижней грани экрана
 */
function validTranslateY( coordinates: SwipeCoordinates, state: ElemState ): number
{
	return coordinates.dy >= -1 * coordinates.maxDy
			? state.translateY + coordinates.dy
			: state.translateY - coordinates.maxDy;
}

/**
 * Скрытая нижняя часть объекта, которая не влезла на экран
 */
function availableOffset( elem: HTMLElement, state: ElemState ): number
{
	return elem.clientHeight - (screenHeight() - elem.offsetTop - state.translateY);
}

/**
 * Можно ли двигать объект?
 * 
 * Можно двигать
 * * на вертикальной мобильной версии,
 * * касаясь только одним пальцем.
 */
function isMovingAvailable( event: TouchEvent ): boolean
{
	return document.documentElement.clientWidth > MOBILE_WIDTH
		|| event.touches.length > 1
		|| event.touches.length < 0;
}

/**
 * Сдвинут ли объект на достаточную величину, чтобы изменить его значение `isOpen`?
 * Направленность сдвига проверяется.
 * Сдвиг в противоположную необходимому направлению сторону не считается валидным.
 * @param thresholdPx Порог
 */
function isThresholdCrossed( thresholdPx: number, coordinates: SwipeCoordinates, state: ElemState ) {
	return Math.abs(coordinates.dy) >= thresholdPx &&
		(state.isOpen ? coordinates.dy > 0 : coordinates.dy < 0);
}

/**
 * Текущее значение свойства `translateY` HTML элемента
 */
function translateY( elem: HTMLElement ): number
{
	const transform = getComputedStyle(elem).transform;
	const groups = transform.match( PosYRegExp );
	if( !groups )
	{
		console.error( 'There is no match group:', transform );
		return 0;
	}
	return parseFloat( groups[1] );
}

/**
 * Размер шрифта на элементе в px
 */
function getFontSize( element: HTMLElement ): number
{
	return parseFloat( getComputedStyle( element ).fontSize );
}

/**
 * Перевод `em` значения `value` в `px`, исходя из размера шрифта на элементе `element`
 */
function emToPx( value: Em, element: HTMLElement ): Px
{
	return value * getFontSize( element );
}

/**
 * Координата X элемента
 */
function currentX( event: TouchEvent ): number
{
	return event.touches.item( 0 )!.clientX;
}

/**
 * Координата Y элемента
 */
function currentY( event: TouchEvent ): number
{
	return event.touches.item( 0 )!.clientY;
}

/**
 * Высота экрана
 */
function screenHeight(): number
{
	return document.documentElement.clientHeight;
}

/**
 * Было ли касание произведено по-горизонтали 
 */
function isHorizontalTouchMove( event: TouchEvent, coordinates: SwipeCoordinates ): boolean
{
	const cos = cosAlpha( coordinates.startX, coordinates.startY,
							currentX( event ), currentY( event ) );
	return Math.abs(cos) > COS45;
}

/**
 * Косинус угла между отрезком и горизонтальной поверхностью
 */
function cosAlpha( ax: number, ay: number, bx: number, by: number ): number
{
	return (bx - ax) / Math.sqrt(Math.pow(bx- ax, 2) + Math.pow(by - ay, 2));
}




export default useVerticalOpening;