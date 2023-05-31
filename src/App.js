
import './App.css';
import { movies } from './data/movies';
import { Wrapper } from './feature/SearchSuggestions/Wrapper';
const movieTitles = movies.map(movie => movie.title)

function App() {
  return (
    <>
      <h1>Welcome to fake movie search</h1>
      <Wrapper suggestions={movieTitles} />
    </>
  );
}

export default App;
