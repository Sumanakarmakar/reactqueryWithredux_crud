import { Box, Container, Grid, Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getProductDetails } from '../Api/Functions/ProdDetail.api'
import { Link, useParams } from 'react-router-dom'
import PageLoader from '../Components/Loader/PageLoader'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { getAllProducts } from '../Api/Functions/Productlist.api'

const ProductDetails = () => {
    const { id } = useParams()
    const {
        isLoading, isError, data: proddetaildata, error
    } = useQuery({
        queryKey: ['prod_detail', id],
        queryFn: () => getProductDetails(id)
    })

    //for all products
    const products = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts
    })


    if (isError) {
        return <h1>{error.message}</h1>
    }
    console.log("product details here", proddetaildata);

    return (
        <>

            <Container sx={{ mt: 5, textAlign: "center" }}>

                <Typography variant='h6'>
                    You can get product details here
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {!isLoading ? (
                            <>
                                <Card sx={{ maxWidth: "100%", mx: "auto", mt: 5 }}>
                                    <CardMedia
                                        component="img"
                                        alt={proddetaildata?.title}
                                        height="100%"
                                        image={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${proddetaildata?.image}`}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {proddetaildata?.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {proddetaildata?.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to='/products'>
                                            <Button size="small">Back</Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </>
                        ) : (
                            <>
                                <Card sx={{ maxWidth: "100%", mx: "auto", mt: 5 }}>
                                    <CardMedia>
                                        <Skeleton variant="rounded" height={400} />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                                        </Typography>
                                    </CardContent>
                                    <CardActions>

                                        <Skeleton variant="rounded" width={100} height={50} />

                                    </CardActions>
                                </Card>
                            </>
                        )}

                    </Grid>

                    <Grid item xs={4}>
                        <Container>
                            <Box sx={{ mt: 4, textAlign: "center" }}>
                                <Typography variant='h6'>
                                    Recent Products
                                </Typography>
                            </Box>

                            <ImageList sx={{ width: 500, height: 450 }}>

                                {
                                    products.data?.data?.map((item) => (
                                        <ImageListItem cols={12}>
                                            <img
                                                srcSet={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${item?.image}`}
                                                src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${item?.image}`}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                title={item.title}
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about ${item.title}`}
                                                    >
                                                        <Link to={`/productdetails/${item._id}`}>
                                                            <InfoIcon />
                                                        </Link>
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    ))
                                }


                            </ImageList>
                        </Container>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}

export default ProductDetails