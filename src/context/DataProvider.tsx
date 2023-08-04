import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"
import { PropsChildren } from "../interfaces/reactComponents"
import { Note } from "../interfaces/notes"
import { DocumentData } from "firebase/firestore"

interface ProviderValue {
    setNotes: Dispatch<SetStateAction<Note[] | DocumentData[]>> | null,
    setNote: Dispatch<SetStateAction<Note | DocumentData | null>> | null,
    setIsLoading: Dispatch<SetStateAction<boolean>> | null,
    notes: Note[],
    note: Note | null,
    isLoading: boolean
}

const DataContext = createContext<ProviderValue>({
    setNotes: null,
    setNote: null,
    setIsLoading: null,
    notes: [],
    note: null,
    isLoading: false
})

export const useData = () => {
    return useContext(DataContext)
}

export const DataProvider = ({children}: PropsChildren) => {
    const [notes, setNotes] = useState<Note[]>([])
    const [note, setNote] = useState<Note | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <DataContext.Provider value={{
            setNotes,
            setNote,
            setIsLoading,
            notes,
            note,
            isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}