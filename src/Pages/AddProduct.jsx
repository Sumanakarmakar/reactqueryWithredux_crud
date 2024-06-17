import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { createProduct } from '../Api/Functions/Createprod.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form'
import ButtonLoader from '../Components/Loader/ButtonLoader'


const defaultTheme = createTheme();

const AddProduct = () => {
    const navigate = useNavigate()
    const [image, setImage] = useState()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const {
        mutate, isPending
    } = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            if (data?.status === 200) {
                console.log("product added", data);
                toast.success(data?.message)
                navigate("/products")
            }
        },
        onError: (err) => {
            console.log("Error detected", err);
        }
    })

    const onSubmitProduct = (data) => {
        let formdata = new FormData()
        formdata.append("title", data?.title)
        formdata.append("description", data?.description)
        formdata.append("image", image)
        mutate(formdata)
    }
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

                        <Typography component="h1" variant="h5">
                            Add a Product
                        </Typography>
                        <Box component="form"
                            onSubmit={handleSubmit(onSubmitProduct)}
                            noValidate

                            sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="product Title"
                                {...register("title", {
                                    required: true
                                })}

                            />
                            {errors?.title?.type === 'required' && <p>This field is Required</p>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Description"
                                {...register("description", {
                                    required: true
                                })}

                            />
                            {errors?.description?.type === 'required' && <p>This field is Required</p>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='file'
                                name='image'
                                id='image'
                                onChange={(e) => setImage(e.target.files[0])}

                            />
                            {image !== null && image !== undefined && image !== "" ?
                                (
                                    <>
                                        <img src={URL.createObjectURL(image)} alt='prod_pic'
                                            height="200px" width="200px"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>Drag and drop image here</p>
                                    </>
                                )}


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {isPending ? <ButtonLoader /> : <>Submit</>}


                            </Button>

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

        </>
    )
}

export default AddProduct