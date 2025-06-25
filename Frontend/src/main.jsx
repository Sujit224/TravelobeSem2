import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx'
import Footer from './components/custom/Footer'
import MyTrips from './my-trips'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/create-trip',
    element: <CreateTrip/>
  },
  {
    //Dynamic Routes
    path:'/view-trip/:tripId', //Passing a Random value to the tripId
    element:<Viewtrip/>
  },
  {
    path:'/my-trips',
    element:<MyTrips/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID }>
      <Header/>
      <Toaster />
      <RouterProvider router={router}/>
      <Footer/>
    </GoogleOAuthProvider>
    
  </StrictMode>,
)
