import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getProfileDetails } from '../Api/Functions/Dashboard.api'
import { Button, Card, CardActions, CardContent, CardMedia, Container, Skeleton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Profile = () => {
    const {
        isLoading, isError, data: profiledata, error
    } = useQuery({
        queryKey: ['member'],
        queryFn: getProfileDetails
    })

    if (isError) {
        return <h1>{error.message}</h1>
    }
    console.log("profile data", profiledata);

    return (
        <>
            <Container>
                {!isLoading ? (
                    <>
                        <Card sx={{ maxWidth: 350, mx: "auto", mt: 5 }}>
                            <CardMedia
                                component="img"
                                alt={profiledata?.data?.first_name}
                                height="100%"
                                image={`https://wtsacademy.dedicateddevelopers.us/uploads/user/${profiledata?.data?.profile_pic}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Name : {profiledata?.data?.first_name} {profiledata?.data?.last_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Email : {profiledata?.data?.email}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to='/'>
                                    <Button size="small">Back to Home</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </>
                ) : (
                    <>
                        <Card sx={{ maxWidth: 350, mx: "auto", mt: 5 }}>
                            <CardMedia>
                                <Skeleton variant="rounded" height={300} />
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
            </Container>

        </>
    )
}

export default Profile