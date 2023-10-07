import {useState} from 'react'
import { useGlobalContext } from '../context'

const Search = () => {
  const {setSearchTerm, randomMeal} = useGlobalContext()
  const [text,setText] = useState('')

  const handleChange = e => {
      setText(e.target.value)
  }
  
  const handleSubmit = e => {
      e.preventDefault()
      if(text !== null) {
        setSearchTerm(text)
      }
  }

  return (
    <header>
    <form className='search-form' onSubmit={handleSubmit}>
      <input
       type="text"
        onChange={handleChange}
        value={text}
         className="inp" />
      <button className="btn" type='submit'>Submit</button>
      <button className="btn" type='button' onClick={randomMeal}>Surprise me</button>
    </form>
    </header>
  )
}

export default Search