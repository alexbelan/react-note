import { useCallback, useRef, useState } from "react"
import { useData } from "../../../context/DataProvider"
import useGetNotes from "../../../hooks/useGetNotes"
import { List } from "@mui/material"
import { Note } from "../../../interfaces/notes"
import { useNavigate } from "react-router"
import ListItemNote from "../../ListItem/components/ListItem";
import Error from "../../../pages/Error"

const Sidebar = () => {
    const navigate = useNavigate()
    const [pageNumber, setPageNumber] = useState<number>(1)
    const { notes } = useData()
    const observer = useRef<IntersectionObserver | null>(null)
    const {isLoading, error, hasMore } = useGetNotes(pageNumber)

    const lastNodeRef = useCallback((node: HTMLLIElement) => {
        if(isLoading) return
        if(observer.current && !!observer.current.disconnect) {
            observer.current.disconnect()
        }

        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && hasMore) {
                setPageNumber(prev => prev + 1)
            }
        })
        if(node) {
             observer.current.observe(node)
        }
    }, [isLoading, hasMore])

    const onNavigate = (id: string) => {
        navigate(`/${id}`)
    }

    return (
        <>
            {error && (
                <Error />
            )}
            {!error && notes && (
                <List>
                    {notes.map((item: Note, index: number) => {
                        if(notes.length === index + 1) {
                            return (
                                <>
                                <ListItemNote 
                                        key={item.id}
                                        onClick={() => onNavigate(item.id)}
                                        title={item.body}
                                        ref={lastNodeRef}
                                        />
                                    <hr />
                                </>
                            )
                        }
                        return (
                            <>
                                <ListItemNote 
                                        key={item.id}
                                        onClick={() => onNavigate(item.id)}
                                        title={item.body}
                                        ref={lastNodeRef}
                                        />
                                <hr />
                            </>
                        )
                    })}
                </List>
                )
            }
            {isLoading && (
                <h3>...Loading</h3>
            )}
        </>
    )
}

export default Sidebar