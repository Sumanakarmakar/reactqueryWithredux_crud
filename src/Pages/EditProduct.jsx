import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form'
import ButtonLoader from '../Components/Loader/ButtonLoader'
import { getProductDetails } from '../Api/Functions/ProdDetail.api';
import { useMutation } from '@tanstack/react-query';
import { updateProduct } from '../Api/Functions/Update.api';


const defaultTheme = createTheme();

const EditProduct = () => {
    const { id } = useParams()
    const [prodData, setProdData] = useState({})
    const [image, setImage] = useState()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue
    } = useForm()

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => updateProduct(data),
        onSuccess: (data) => {
            if (data?.status === 200) {
                toast.success(data?.message)
                navigate("/products")
            }
        },
        onError: (err) => {
            console.log("err detected", err);
        }
    })

    const onSubmitEditprod = (data) => {
        let formdata = new FormData()
        formdata.append("id", id)
        formdata.append("title", data?.title)
        formdata.append("description", data?.description)
        formdata.append("image", image)
        mutate(formdata)
    }

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const res = await getProductDetails(id)
                setProdData(res)
            } catch (err) {
                console.log("error detected", err);
            }
        }
        fetchProductDetail()
    }, [id])

    console.log("dvsd", prodData);

    useEffect(() => {
        setValue("title", prodData?.title)
        setValue("description", prodData?.description)
        // setValue("image", document.getElementById('image').files[0])
    }, [prodData, setValue])

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
                            Edit your Product
                        </Typography>
                        <Box component="form"
                            onSubmit={handleSubmit(onSubmitEditprod)}
                            noValidate
                            sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                {...register("title", {
                                    required: true
                                })}

                            />


                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                {...register("description", {
                                    required: true
                                })}

                            />


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
                                            height="250px" width="300px"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <img src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${prodData?.image}`} alt={prodData?.title}
                                            height={250} width={300}
                                        />
                                    </>
                                )}


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {isPending ? <ButtonLoader /> : <>Save Changes</>}


                            </Button>

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

        </>
    )
}

export default EditProduct