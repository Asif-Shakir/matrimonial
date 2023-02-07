import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './App.css';
import Counter from './components/Counter';
import Layout from './layouts/layoutone/Layout';
import AddCity from './pages/AddCity';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'counter', element: <Counter /> },
      { path: 'add-city', element: <AddCity /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
