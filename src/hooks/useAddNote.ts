import { useState } from "react"
import { useData } from "../context/DataProvider"
import { createNote, getNote } from "../api/firebase"
import { Note } from "../interfaces/notes"

const useAddNote = () => {
    const { setNotes } = useData()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const addData = async () => {
        try {
            setIsLoading(true)
            const docRef = await createNote({
                body: '',
                datetime: new Date().toString()
            })
            const docRefNew = await getNote(docRef.id)
            setNotes((prev: Note[]) => [{id: docRef.id, ...docRefNew.data()}, ...prev])
            setIsLoading(false)
            return docRef.id
        } catch (error) {
            console.error(error)
            setError(true)
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        addData
    }
}

export default useAddNote