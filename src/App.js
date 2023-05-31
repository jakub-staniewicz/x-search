
import './App.css';

import { SearchForm } from './feature/SearchForm/component';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: "/*",
    element: <SearchForm />,
    errorElement: <p>Oh no wrong url go <a href='/'>here</a></p>
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
