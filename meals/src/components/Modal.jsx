import React from 'react'
import { useGlobalContext } from '../context'

const Modal = () => {
  const {selectedMeal,closeMeal} = useGlobalContext()
const {
  strMealThumb:image,
  strMeal:title,
  strInstructions:text,
  strSource:source
} = selectedMeal

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
          <img src={image} alt={title} className="img img-modal" />
        <div className="modal-content">
          <h3 className="modal-content__title">{title}</h3>
          <p>Instructions:</p>
          <p>{text}</p>
          <a href={source} className="modal-content__link" target='_blank'>Original Source</a>
        </div>
        <button className="btn close-btn" onClick={closeMeal}>Close</button>
      </div>
    </div>
  )
}

export default Modal