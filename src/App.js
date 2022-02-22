import Home from "./Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AnimeDetails from "./AnimeDetails";
import Rating from "./Rating";
import ScrollToTop from "./ScrollToTop";
import Episodes from "./Episodes";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:id" element={<AnimeDetails/>}/>
          <Route path="/:id/ratings" element={<Rating/>}/>
          <Route path="/:id/episodes" element={<Episodes/>}/>

        </Routes>
      </div>
    </Router>

  );
}

export default App;