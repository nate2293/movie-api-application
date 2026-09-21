import { useEffect, useRef } from "react";

export function useEventListener(
    eventType: string,
    handler: (event: Event) => void,
    element?: EventTarget,
    options?: AddEventListenerOptions,
) {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement = element ?? window;

        const eventListener = (event: Event) => {
            savedHandler.current(event);
        };

        targetElement.addEventListener(eventType, eventListener, options);

        return () => {
            targetElement.removeEventListener(eventType, eventListener, options);
        };
    }, [eventType, element, options]);
}