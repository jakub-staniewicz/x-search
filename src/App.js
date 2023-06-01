import './App.css';
import { SearchForm } from './feature/SearchForm/component';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorMessage } from './feature/Error/ErrorMessage';
import { ErrorBoundary } from './feature/Error/ErrorBounduary';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <SearchForm />,
    errorElement: <ErrorMessage />
  }
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
