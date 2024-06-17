import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import PageLoader from '../Components/Loader/PageLoader'
import { getAllProducts } from '../Api/Functions/Productlist.api'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CardMedia, Container, Pagination, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useParams } from 'react-router-dom';
import { deleteProduct } from '../Api/Functions/Removeprod.api';
import { toast } from 'react-toastify';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AllProducts = () => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 2

  const {
    isLoading, isError, data: allproductdata, error, refetch
  } = useQuery({
    queryKey: ['allproducts', page],
    queryFn: () => getAllProducts({ page, perpage: itemsPerPage }),
    keepPreviousData: true,

  })

  //for pagination
  const totalPages = allproductdata?.totalPages
  const handlePageChange = (e, value) => {
    setPage(value)
  }


  //for delete product
  const handleDeleteProduct = async (id) => {
    const res = await deleteProduct(id)
    // console.log(res);
    if (res?.status === 200) {
      toast.success(res?.message)
    }

    refetch()
  }

  if (isLoading) {
    return <h1><PageLoader /></h1>
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }

  console.log("all product here", allproductdata);

  return (
    <>

      <Container >
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right" colSpan={3}>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                Array.isArray(allproductdata?.data) && allproductdata?.data?.map((item) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {item.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.description}</StyledTableCell>
                    <StyledTableCell align="right">
                      <CardMedia
                        component='img'
                        image={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${item?.image}`}
                        alt={item.title}
                        height="200px"
                        width="150px"

                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Link to={`/productdetails/${item._id}`}>
                        <Button variant='contained'>View</Button>
                      </Link>
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <Link to={`/edit/${item._id}`}>
                      <EditIcon color='primary' />
                      </Link>
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <Button onClick={() => handleDeleteProduct(item._id)}>
                        <DeleteIcon color='primary' />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              }


            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 3 }}>
          <Pagination
            component="div"
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color='primary'

          />
        </Box>
      </Container>

    </>
  )
}

export default AllProducts