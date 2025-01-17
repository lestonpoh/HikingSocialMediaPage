import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.tsx";
import Hikes from "./pages/Hikes.tsx";
import ErrorPage from "./layout/ErrorPage.tsx";
import HikeDetails from "./pages/HikeDetails.tsx";
import CreateEditHike from "./pages/CreateEditHike.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import LayoutNew from "./layout/LayoutNew.tsx";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import ProtectedRoute from "./layout/ProtectedRoute.tsx";
import { DarkModeContextProvider } from "./context/darkModeContext.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutNew />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
    errorElement: <ErrorPage />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Hikes />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/hikes",
    element: <Hikes />,
  },
  {
    path: "/hikes/:name",
    element: <HikeDetails />,
  },
  {
    path: "/CreateEditHike/:id?",
    element: <CreateEditHike />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return (
    <DarkModeContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </DarkModeContextProvider>
  );
}

export default App;
