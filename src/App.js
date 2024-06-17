import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './Components.css'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./Pages/Home";
import AllProducts from "./Pages/AllProducts";
import Layout from "./Common/Layout";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { check_token } from "./Redux/AuthSlice";
import AddProduct from "./Pages/AddProduct";
import ProductDetails from "./Pages/ProductDetails";
import EditProduct from "./Pages/EditProduct";
import Profile from "./Pages/Profile";

function App() {
  const queryclient = new QueryClient()
  const dispatch = useDispatch()

  function PrivateRoute({ children }) {
    let token = localStorage.getItem('token') || sessionStorage.getItem('token')
    return token !== null && token !== undefined && token !== "" ?
      (
        children
      ) : (
        <Navigate to='/login' />
      )
  }

  const public_route = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/login',
      component: <Login />
    },
    {
      path: '/registration',
      component: <Registration />
    }
  ]

  const private_route = [
    {
      path: '/products',
      component: <AllProducts />
    },
    {
      path: '/addproduct',
      component: <AddProduct />
    },
    {
      path: '/productdetails/:id',
      component: <ProductDetails />
    },
    {
      path: '/edit/:id',
      component: <EditProduct />
    },
    {
      path: '/profile',
      component: <Profile />
    }
  ]

  useEffect(() => {
    dispatch(check_token())
  }, [])

  return (
    <>

      <ToastContainer />

      <QueryClientProvider client={queryclient}>
        <Router>
          <Layout>
            <Routes>
              {
                public_route?.map((route) => (
                  <Route path={route.path} element={route.component} />
                ))
              }
              {
                private_route?.map((route) => (
                  <Route path={route.path} element={<PrivateRoute>{route.component}</PrivateRoute>} />
                ))
              }

            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>

    </>
  );
}

export default App;
