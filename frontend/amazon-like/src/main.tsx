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
import ProductListPage from './pages/ProductListPage.tsx';

 

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
  },  {
    path : '/products',
    element: <ProductListPage />
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
