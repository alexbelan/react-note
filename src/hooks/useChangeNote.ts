import { useCallback, useState } from "react"
import { useData } from "../context/DataProvider"
import { updateNote} from "../api/firebase"
import { DocumentData } from "firebase/firestore"
import { Note } from "../interfaces/notes"

const useChangeNote = (id: string) => {
    const { setNote, } = useData()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const updateData = useCallback(async (text: string) => {
        try {
            setIsLoading(true)
            if(typeof text === 'string' && typeof id === 'string' && setNote !== null) {
                await updateNote(id, {body: text})
                setNote((prev: Note | DocumentData) => ({...prev, body: text}))
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setError(true)
            setIsLoading(false)
        }
    }, [id])
    
    return {
        isLoading,
        error,
        updateData
    }
}

export default useChangeNote