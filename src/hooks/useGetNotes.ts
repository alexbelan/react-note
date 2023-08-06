import { useCallback, useEffect, useState } from "react"
import { useData } from "../context/DataProvider"
import { Note } from "../interfaces/notes"
import { getNotes } from "../api/firebase"
import { DocumentData } from "firebase/firestore"

const useGetNotes = (page: number) => {
    const { setNotes } = useData()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [lastVisible, setLastVisible] = useState<unknown | null>(null)

    const getData = useCallback(async () => {
        try {
            setIsLoading(true)
            const docRef = await getNotes(25, lastVisible)
            const docsArray: Note | DocumentData = []
            docRef?.forEach(doc => {
                docsArray.push({id: doc.id, ...doc.data()})
            })
            await docsArray?.forEach((item: Note) => {
                if('body' in item) {
                    setNotes((prev: Note[]) => [...prev, item])
                }
            })
            setLastVisible(docRef?.docs[docRef?.docs?.length-1])
            setHasMore(docsArray?.length > 0)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setError(true)
            setIsLoading(false)
        }
    }, [lastVisible])
    
    useEffect(() => {
        getData()
    }, [page, getData])
    
    return {
        isLoading,
        error,
        hasMore,
        getData
    }
}

export default useGetNotes