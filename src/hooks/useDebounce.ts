import { useEffect } from "react"
import useTimeout from "./useTimout"

const useDebounce = <T>(callback: () => void, delay: number, dependencies: Array<T> ) => {
    const {set, clear} = useTimeout(callback, delay)

    useEffect(set, [...dependencies, set])
    useEffect(clear, [clear])
}

export default useDebounce