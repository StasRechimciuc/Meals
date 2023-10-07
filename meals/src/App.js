import './App.css';
import Favorite from './components/Favorite'
import Meals from './components/Meals'
import Search from './components/Search'
import Modal from './components/Modal'
import React from 'react'
import { useGlobalContext } from './context';

function App() {
  const {showModal, favorites} = useGlobalContext()
return (
  <div className="App">
    <Search />
    {favorites.length>0 && <Favorite /> }
     <Meals /> 
    {showModal && <Modal />}
  </div>
);
}

export default App;
