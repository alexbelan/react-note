import { Alert, Box, Button, Card, CardContent, Collapse } from "@mui/material"
import React, {useState} from "react"
import { form } from "./interfaces"
import { InputText } from "../../../components/Input"
import { useAuth } from "../../../context/AuthProvider"
import { useLocation, useNavigate } from "react-router"

const Form = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [dataForm, setDataForm] = useState<form>({
        email: '',
        password: ''
    })
    const [dataError, setDataError] = useState<string>('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataForm(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        try {
            event.preventDefault()
            const result = await auth?.signin(dataForm.email, dataForm.password, () => navigate(location.state?.from || '/', {
                replace: true
            }))
            if(result.code === 'auth/user-not-found') {
                setDataError('Не верный email или пароль')
            }
        } catch (error) {
            console.error('error', error)
        }
    }


    return (
        <Card sx={{ maxWidth: 500, margin: "auto", mt: "40px" }} variant="outlined">
            <CardContent component={"form"} onSubmit={handleSubmit}>
                <h1>Entry</h1>
                    <Box component={'div'} sx={{
                        width: '100%',
                        mb: '20px'
                    }}>
                        <InputText
                            label={"Email"}
                            name={"email"}
                            type={"email"}
                            value={dataForm.email}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box component={'div'} sx={{
                        width: '100%',
                        mb: '20px'
                    }}>
                        <InputText
                            label={"Password"}
                            name={"password"}
                            type={"password"}
                            value={dataForm.password}
                            onChange={handleChange}
                        />
                    </Box>
                    <Collapse in={!!dataError} sx={{mb: '20px'}}>
                        <Alert severity="error">{dataError}</Alert>
                    </Collapse>
                    <Box>
                        <Button type="submit" variant="contained">Entry</Button>
                    </Box>
            </CardContent>
        </Card>
    )
 }

 export default Form