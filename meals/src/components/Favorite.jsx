import React from 'react'
import { useGlobalContext } from '../context'
const Favorite = () => {
  const {removeFavoriteMeal,favorites,selectMeal} = useGlobalContext()
  return (
    <section className='favorites-section'>
      <div className="favorites">
        <h1>Favorites</h1>
        <div className="favorites__container">
          {favorites.map(item => {
            const {strMeal,strMealThumb:image,idMeal} = item
            return(
              <div className="favorite__container__item" key={idMeal}>
                <h5>{strMeal}</h5>
                <img className="favorite-img img" src={image} onClick={() => selectMeal(idMeal,true)}/>
                <button className="btn favorite-btn" onClick={() => removeFavoriteMeal(idMeal)}>Remove</button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Favorite
