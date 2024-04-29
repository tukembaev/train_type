import { useEffect, useState } from "react"

export function useTimer(delay: number) {
    const [timeLeft, setTimeLeft] = useState(delay)
    const [isFinish, setIsFinish] = useState(false)
    
    useEffect(() => {
        const interval = setInterval(() => {
            // eslint-disable-next-line no-unused-expressions
            !isFinish &&
                setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0))
        }, 1000)
        if (timeLeft === 0) setIsFinish(true)
        return () => {
            clearInterval(interval)
        }
    }, [timeLeft, isFinish])

    const resetTimer = () => {
        setTimeLeft(delay)
        setIsFinish(false)
    }

    return { isFinish, resetTimer }

}