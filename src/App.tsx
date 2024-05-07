import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header";
import SearchBar from "./pages/SearchBar";
import PokemonList from "./pages/PokemonList";
import PokeFav from "./pages/PokemonFavorite";


function App() {
  return (
    <div className="App">
        <Router>
      <Header />
      <Routes>
        <Route path="/list" element={<PokemonList />} />
        <Route path="/" element={<SearchBar />} />
        <Route path="/favorite" element={<PokeFav />} />
      </Routes>
        </Router>
    </div>
  );
}

export default App;