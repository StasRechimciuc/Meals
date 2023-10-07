import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
  const allMealsUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

  const handleFetch = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      if (data.meals) {
        setMeals(data.meals);
      } else setMeals([]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  function getFavoritesFromLocalStorage() {
    let favorites = localStorage.getItem("favorites");
    if (favorites) {
      favorites = JSON.parse(localStorage.getItem("favorites"));
    } else {
      favorites = [];
    }
    return favorites;
  }

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setShowModal(true);
    setSelectedMeal(meal);
    return meal;
  };

  const closeMeal = () => {
    return setShowModal(false);
  };

  const addFavoriteMeal = (idMeal) => {
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites, meal];
    console.log(updatedFavorites);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavoriteMeal = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    console.log(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    handleFetch(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  const randomMeal = () => handleFetch(randomMealUrl);

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        randomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeMeal,
        addFavoriteMeal,
        removeFavoriteMeal,
        favorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
