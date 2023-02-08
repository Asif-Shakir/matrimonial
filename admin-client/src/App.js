import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Counter from './components/Counter';
import Layout from './layouts/layoutone/Layout';
import AddCity from './pages/AddCity';
import Login from './pages/auth/login/Login';
import Registration from './pages/auth/registration/Registration';
import { ToastContainer } from 'react-toastify';
const routes = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'signup', element: <Registration /> },
      { path: 'counter', element: <Counter /> },
      { path: 'add-city', element: <AddCity /> },
    ],
  },
]);
function App() {
  return (
    <>
      <ToastContainer theme="dark" />
      <RouterProvider router={routes} />;
    </>
  );
}

export default App;
