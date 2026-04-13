import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root';
import Home from './Home';
import EmailRegister from './EmailRegister';
import EmailLogin from './EmailLogin';
import AuthProvider from './contexts/AuthProvider';
import PrivateRoutes from './routes/PrivateRoutes';
import PrivateRoute from './PrivateRoute';

const AuthContext = createContext(null)

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/email',
        Component: EmailRegister
      },
      {
        path: '/login',
        Component: EmailLogin
      },
      {
        path: '/private',
        element: <PrivateRoutes>
                 <PrivateRoute></PrivateRoute>
                 </PrivateRoutes>
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
