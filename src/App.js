
import './App.css';
import { SearchSuggestions } from './components/SearchSuggestions';
import {movies} from './data/movies';
const movieTitles = movies.map(movie => movie.title)

function App() {
  return (
    <>
      <h1>Welcome to fake movie search</h1>
      <SearchSuggestions suggestions={movieTitles} />
    </>
  );
}

export default App;
