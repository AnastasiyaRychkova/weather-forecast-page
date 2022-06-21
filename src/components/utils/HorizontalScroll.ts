import { useRef, useEffect } from "react";

function useHorizontalScroll<T extends HTMLElement>() {
	const scrolledElemRef = useRef<T>( null );

	useEffect( () => {
		const scrolledElem = scrolledElemRef.current;
		if( !scrolledElem )
			return;

		const onWheel = ( event: WheelEvent ) => {
			if( event.deltaY === 0 )
				return;
			event.preventDefault();
			scrolledElem.scrollTo({
				left: scrolledElem.scrollLeft + event.deltaY,
			});
		};
		scrolledElem.addEventListener( "wheel", onWheel );

		return () => {
			scrolledElem.removeEventListener( "wheel", onWheel );
		};
	} );

	return scrolledElemRef;
}

export default useHorizontalScroll;