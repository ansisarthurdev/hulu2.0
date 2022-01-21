import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//pages
import Home from './pages/Home';

//components
import Navigation from './components/Navigation';
import NowPlaying from './components/NowPlaying'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <NowPlaying />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
