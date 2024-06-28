import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CategoriesDetails from "./components/CategoriesDetails/CategoriesDetails";
import RelatedBrand from "./components/RelatedBrand/RelatedBrand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import WishListContextProvider from "./contexts/WishListContext";
import Wishlist from "./components/Wishlist/Wishlist";
import CodePassword from "./components/CodePassword/CodePassword";

let query = new QueryClient();

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            {" "}
            <Wishlist />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "categoriesDetails/:category",
        element: (
          <ProtectedRoute>
            <CategoriesDetails />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "relatedBrand/:brand",
        element: (
          <ProtectedRoute>
            <RelatedBrand />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "codepassword", element: <CodePassword /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  const [count, setCount] = useState(0);

  return (
    <WishListContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={query}>
          <UserContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
            <ReactQueryDevtools />
          </UserContextProvider>
        </QueryClientProvider>
      </CartContextProvider>
    </WishListContextProvider>
  );
}

export default App;
