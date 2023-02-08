import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './App.css';
import Counter from './components/Counter';
import Layout from './layouts/layoutone/Layout';
import AddCity from './pages/AddCity';
import Login from './pages/auth/login/Login';
import Registration from './pages/auth/registration/Registration';
const routes = createBrowserRouter([
  { path: 'login', element: <Login /> },
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
  return <RouterProvider router={routes} />;
}

export default App;
