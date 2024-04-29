import { useEffect, useState, useRef, useCallback } from "react";

export function useStopWatch(isStarted: boolean) {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    // eslint-disable-next-line no-undef
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    const resetStopwatch = useCallback(() => {
        setElapsedSeconds(0);
        setIsRunning(false);
        clearInterval(intervalIdRef.current!);
        intervalIdRef.current = null;
    }, []);

    useEffect(() => {
        if (isStarted && !isRunning) {
            setIsRunning(true);
            intervalIdRef.current = setInterval(() => {
                setElapsedSeconds((prevElapsedSeconds) => prevElapsedSeconds + 1);
            }, 1000);
        } else if (!isStarted && isRunning) {
            setIsRunning(false);
            clearInterval(intervalIdRef.current!);
            intervalIdRef.current = null;
        }
    
        return () => {
            if (isRunning) {
                clearInterval(intervalIdRef.current!);
                intervalIdRef.current = null;
            }
        };
    }, [isStarted]);

    useEffect(() => {
        return () => {
            clearInterval(intervalIdRef.current!);
            intervalIdRef.current = null;
        };
    }, []);

    return { elapsedSeconds, isRunning, resetStopwatch };
}
