import { StrictMode } from 'react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import RegisterPage from './pages/RegisterPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import FirstConnection from './pages/FirstConnection.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import Account from './pages/Account.tsx';

 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path : '/login',
    element: <LoginPage />
  },
  {
    path : '/register',
    element: <RegisterPage />
  },
  {
    path : '/first-connection',
    element: <FirstConnection />
  },
  {
    path : '/account',
    element: <Account />
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>
)
