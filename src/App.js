import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//pages
import Home from './pages/Home';
import Category from './pages/Category';
import NotFound from './pages/NotFound';

//components
import Navigation from './components/Navigation';
import NowPlaying from './components/NowPlaying';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
      <Navigation />

        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categories/:name/:id" element={<Category />}></Route>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
