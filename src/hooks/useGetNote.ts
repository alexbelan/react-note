import { useCallback, useEffect, useState } from "react"
import { useData } from "../context/DataProvider"
import { getNote } from "../api/firebase"

const useGetNote = (id?: string) => {
    const { setNote } = useData()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const getData = useCallback(async (noteId: string) => {
        try {
            setIsLoading(true)
            const docRef = await getNote(noteId)
            setNote({...docRef.data(), id: docRef.id})
            setIsLoading(false)
        } catch (error) {
            setError(true)
            setIsLoading(false)
        }
    }, [])
    
    useEffect(() => {
        if(typeof id === 'string') {
            getData(id)
        }
    }, [id])
    
    return {
        isLoading,
        error,
        getData
    }
}

export default useGetNote