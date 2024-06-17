import React, { useEffect, useState } from 'react'
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
import { registration } from '../Redux/AuthSlice';
import ButtonLoader from '../Components/Loader/ButtonLoader';


const defaultTheme = createTheme();

const Registration = () => {
    const dispatch = useDispatch()
    const { redirectToLogin, loading } = useSelector((state) => state?.auth)
    const [image, setImage] = useState()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const onSubmitRegister = (data) => {
        let formdata = new FormData()
        formdata.append("first_name", data?.first_name)
        formdata.append("last_name", data?.last_name)
        formdata.append("email", data?.email)
        formdata.append("password", data?.password)
        formdata.append("profile_pic", image)
        dispatch(registration(formdata))
    }

    useEffect(() => {
        const redirectUser = () => {
            let firstname = localStorage.getItem("firstname")
            let isInLoginPage = window.location.pathname.toLowerCase() === '/registration'
            if (firstname !== null && firstname !== undefined && firstname !== "") {
                isInLoginPage && navigate('/login')
            }
        }
        redirectUser()
    }, [redirectToLogin])

    console.log(watch(['first_name', 'last_name', 'email', 'password',]));

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
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmitRegister)} noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="First Name"
                                        {...register("first_name", {
                                            required: true
                                        })}

                                    />
                                    {errors?.first_name?.type === 'required' && <p>This field is Required</p>}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Last Name"
                                        {...register("last_name", {
                                            required: true
                                        })}

                                    />
                                    {errors?.last_name?.type === 'required' && <p>This field is Required</p>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email Address"
                                        {...register("email", {
                                            required: true,
                                            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                                        })}

                                    />
                                    {errors?.email?.type === 'required' && <p>This field is Required</p>}
                                    {errors?.email?.type === 'pattern' && <p>Invalid email format</p>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                            minLength: 6
                                        })}

                                    />
                                    {errors?.password?.type === 'required' && <p>This field is Required</p>}
                                    {errors?.password?.type === 'minLength' && <p>The minimum password length should be 6 characters</p>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="file"
                                        name='image'
                                        id='image'
                                        onChange={(e) => setImage(e.target.files[0])}

                                    />
                                    {image !== null && image !== undefined && image !== "" ?
                                        (<>
                                            <img src={URL.createObjectURL(image)} alt='PHOTO' height="150px" width="200px" />
                                        </>) : (
                                            <>
                                                {image === null && image === undefined && image === "" && <p>Drag and Drop Image</p>}
                                            </>
                                        )}
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? <ButtonLoader /> : <>Sign Up</>}

                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        Already have an account? Sign in
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

export default Registration