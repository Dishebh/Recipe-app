import React, {useEffect, useState} from 'react';
import './App.css';
import tachyons from 'tachyons';
import Recipe from './Recipe.js';
//import style from './recipe.module.css';

const App = () => {

  const APP_KEY = "9eea9b8d8ebdac3a8144ac94cf91f8ab";
  const APP_ID = "0e0cab47";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('');

  useEffect (() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    const res = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await res.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }



  const updateSearch = (event) => {
    setSearch(event.target.value);
  }

  const getSearch = (event) => {
    event.preventDefault();
    setQuery(search);
  }


  return (
    <div className="App">
      <form className="form-input" onSubmit={getSearch}>
        <input onChange = {updateSearch} value = {search} className="search-bar" type="text" />
        <button className="grow form-button" type="submit">
        Submit
        </button>
      </form>
      <div className="Recipes">
        {recipes.map(recipe => (
          <Recipe
            key = {recipe.recipe.label}
            title = {recipe.recipe.label}
            calories = {recipe.recipe.calories}
            image = {recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
