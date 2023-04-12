import { React } from "react";
import "./App.css"
import ConnectWalletPage from "./pages/ConnectWalletPage/ConnectWalletPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import AllBlogsPage from "./pages/AllBlogsPage/AllBlogsPage";
import AddBlogPage from "./pages/AddBlogPage/AddBlogPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleBlogPage from "./pages/SingleBlogPage/SingleBlogPage";

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
    element: <AllBlogsPage />
  },
  {
    path: "/addblog",
    element: <AddBlogPage />
  },
  {
    path: "/blog/:userAccount/:blogAddress",
    element: <SingleBlogPage />
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;