import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login, regLogout } from '../Redux/AuthSlice';
import ButtonLoader from '../Components/Loader/ButtonLoader';


const defaultTheme = createTheme();

const Login = () => {
    const dispatch = useDispatch()
    const { redirectToDashboard, loading } = useSelector((state) => state?.auth)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const onSubmitLogin = (data) => {
        dispatch(login(data))
    }

    const reg = () => {
        dispatch(regLogout())
    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        let isInLoginPage = window.location.pathname.toLowerCase() === '/login'
        if (token !== null && token !== undefined && token !== "") {
            isInLoginPage && navigate('/')
        }
    }, [redirectToDashboard])

    console.log(watch(['email', 'password']));

    return (
        <>

            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate
                            onSubmit={handleSubmit(onSubmitLogin)}
                            sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                {...register("email", {
                                    required: true
                                })}

                            />
                            {errors?.email?.type === 'required' && <p>This field is Required</p>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                {...register("password", {
                                    required: true
                                })}

                            />
                            {errors?.password?.type === 'required' && <p>This field is Required</p>}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? <ButtonLoader /> : <>Sign In</>}

                            </Button>
                            <Grid container>

                                <Grid item>
                                    <Link to="/registration" variant="body2" onClick={reg}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

        </>
    )
}

export default Login