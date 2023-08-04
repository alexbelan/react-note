import { useCallback, useEffect, useRef } from "react"

const useTimeout = (callback: () => void, delay: number) => {
    const callbackRef = useRef(callback)
    const timeoutRef = useRef(null)

    useEffect(() => {
        callbackRef.current = callback
    })

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
    }, [ delay ])

    const clear = () => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    useEffect(() => {
        return () => {
            clear()
        }
    }, [delay, set, clear])

    return {
        set,
        reset,
        clear
    }
}

export default useTimeout