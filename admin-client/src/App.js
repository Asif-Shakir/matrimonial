import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Counter from "./components/Counter";
import Layout from "./layouts/layoutone/Layout";
import AddCity from "./pages/AddCity";
import Login from "./pages/auth/login/Login";
import Registration from "./pages/auth/registration/Registration";
import { ToastContainer } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import SiteColors from "./assets/colors";
import { useSelector } from "react-redux";
import AddState from "./pages/AddState";
const routes = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "signup", element: <Registration /> },
      { path: "counter", element: <Counter /> },
      { path: "add-city", element: <AddCity /> },
      { path: "add-state", element: <AddState /> },
    ],
  },
]);
function App() {
  const showSpinner = useSelector((state) => state.spinner.show);
  return (
    <>
      <ToastContainer theme="dark" />
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        // wrapperStyle={{}}
        wrapperClass="spinner"
        visible={showSpinner}
        ariaLabel="three-circles-rotating"
        outerCircleColor={SiteColors.primary}
        innerCircleColor={SiteColors.secondary}
        middleCircleColor={SiteColors.primary}
      />
      <RouterProvider router={routes} />;
    </>
  );
}

export default App;
