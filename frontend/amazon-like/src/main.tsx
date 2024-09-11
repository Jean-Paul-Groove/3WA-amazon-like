import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import "./index.css";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProductListPage from "./pages/ProductListPage.tsx";
import { Provider } from "react-redux";
import store from "./store/index.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import FirstConnection from './pages/FirstConnection.tsx';
import Account from './pages/Account.tsx';
import CheckUser from "./bridge/checkUser.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/products",
        element: <ProductListPage />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
      {
        path : '/account',
        element: <Account />
      },
      {
        path : '/dashboard',
        element: <CheckUser />
      },
    ],
  },
  {
    path : '/first-connection',
    element: <FirstConnection />
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
);
