import React, { useState } from 'react'
import Home from "./Routes/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimeDetails from "./Routes/AnimeDetails/AnimeDetails";
import Rating from "./Routes/Rating/Rating";
import Episodes from "./Routes/Episodes/Episodes";
import ReviewPage from "./Routes/ReviewPage/ReviewPage";
import AnimeSearchPage from './Routes/AnimeSearchPage/AnimeSearchPage';
import { ScrollToTop } from "./helpers/helpers";

function App({}) {
  
  return (
    <Router>
      <ScrollToTop/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:id" element={<AnimeDetails />}/>
          <Route path="/:id/ratings" element={<Rating/>}/>
          <Route path="/:id/episodes" element={<Episodes/>}/>
          <Route path="/:id/reviews" element={<ReviewPage/>}/>
          <Route path="/search/:search" element={<AnimeSearchPage/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;