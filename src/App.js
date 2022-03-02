import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//pages
import Home from './pages/Home';
import Category from './pages/Category';
import NotFound from './pages/NotFound';
import MovieInfo from './pages/MovieInfo';

//components
import Navigation from './components/Navigation';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
      <Navigation />

        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categories/:name/:id" element={<Category />}></Route>
          <Route path="/movie/:id" element={<MovieInfo />}></Route>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
