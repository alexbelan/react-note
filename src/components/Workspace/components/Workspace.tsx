import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';
import { Box } from "@mui/material";
import { useData } from "../../../context/DataProvider";
import { marked } from "marked";
import useChangeNote from "../../../hooks/useChangeNote";
import useGetNote from "../../../hooks/useGetNote";
import Header from "./Header";
import { useLocation } from "react-router";
import useDebounce from "../../../hooks/useDebounce";
import Error from "../../../pages/Error";
import './styles.scss'

export const Workspace = () => {
    const {note} = useData()
    const location = useLocation()
    const [text, setText] = useState<string>(note?.body ? note?.body : '')
    const {error: errorChangeNote, updateData} = useChangeNote(location.pathname)
    const {isLoading, error} = useGetNote(location.pathname)
    const [isEdit, setIsEdit] = useState(false)
    
    useEffect(() => {
        if(typeof note?.body === 'string') {
            setText(note?.body)
        }
    }, [note?.id, note?.body])

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value)
  }

  useDebounce(() => {
    updateData(text)
  }, 1000, [text])

    return (
      <>
      {(errorChangeNote || typeof note?.body === 'undefined') ? (
        <Error />
      ) : (
        <Box sx={{
          width: '100%'
        }}>
        <Header setIsEdit={setIsEdit} isEdit={isEdit} />
        {(!isLoading && !error && typeof note?.body === 'string') && 
          <Box sx={{
            mt: '50px'
          }}>
            {isEdit ? (
              <textarea
                className='edit'
                onChange={handleChangeText}
              >
                {text}
              </textarea>
            ) : (
              <Box>
                {parse(marked.parse(note.body))}
              </Box>
            )}
          </Box>
          }
      </Box>
      )}
        
      </>
    );
  };

  export default Workspace