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

import Feedback_app from './Feedback_app'
import ReviewsPage from './pages/ReviewsPage'

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
    path: '/rateus',
    element: <Feedback_app />
  },
  {
    path: '/rateus/reviews',
    element: <ReviewsPage />
  }

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID }>
      {/* <Header/> */}
      <Toaster />
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
    
  </StrictMode>,
)
