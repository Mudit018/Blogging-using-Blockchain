import { React } from "react";
import "./App.css"
import ConnectWalletPage from "./pages/ConnectWalletPage/ConnectWalletPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import AllBlogsPage from "./pages/AllBlogsPage/AllBlogsPage";
import AddBlogPage from "./pages/AddBlogPage/AddBlogPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConnectWalletPage />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/getallblogs",
    element: <AllBlogsPage />,
  },
  {
    path: "/addblog",
    element: <AddBlogPage />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;