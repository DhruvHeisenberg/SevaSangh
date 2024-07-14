import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Box from "@mui/material/Box";

const Dashboard = () => {
  if (typeof window !== "undefined") {
  
    const token= localStorage.getItem('token')
    if (!token) {
      window.location.href = '/pages/login'
    }
    else
    {
      window.location.href = '/forum'
    }
  }
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      minWidth: '100vw'
    }}>
      <CircularProgress/>
    </Box>
  )
}
Dashboard.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Dashboard
