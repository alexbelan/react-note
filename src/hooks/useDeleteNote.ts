import { useEffect, useState } from "react"
import { useData } from "../context/DataProvider"
import { deleteNote } from "../api/firebase"
import { Note } from "../interfaces/notes"
import { useLocation, useNavigate } from "react-router"

const useDeleteNote = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { setNote, setNotes } = useData()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    
    const deteteData = async (id: string) => {
        console.log('deleteId', id)
        try {
            if(typeof id === 'string') {
                setIsLoading(true)
                await deleteNote(id)
                setNotes((prev: Note[]) => (prev.filter(item => item.id !== id)))
                if(location.pathname === id) {
                    navigate('/')
                    setNote(null)
                }
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error)
            setError(true)
            setIsLoading(false)
        }
    }
    
    return {
        isLoading,
        error,
        deteteData
    }
}

export default useDeleteNote