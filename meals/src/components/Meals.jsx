import React, { useContext, useState } from 'react'
import {useGlobalContext} from '../context'

const Meals = () => {
const {meals, loading,selectMeal,selectedMeal,addFavoriteMeal,removeFavoriteMeal} = useGlobalContext()
if(loading) {
  return(
    <section className="section">
      <h4>Loading...</h4>
    </section>
  )
}

if(meals.length < 1) {
  return(
      <section className="section">
          <h4>No such meals</h4>
      </section>
  )
}
 return (
    <section className='heroSection'>
        {meals.map(meal => {
        const {idMeal,strMeal:title,strMealThumb:image} = meal
        return (
          <article key={idMeal} className='meal'>
            <img src={image} className='img' onClick={() => selectMeal(idMeal)} alt={title} />
            <footer>
              <h4>{title}</h4>
              <button className="btn like-btn" onClick = {() => addFavoriteMeal(idMeal)}>Add</button>
            </footer>
          </article>
        )
      })}
    </section>
  )

}

export default Meals