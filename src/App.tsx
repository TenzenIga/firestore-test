import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import { Modal } from './components/Modal/Modal';
import Products from './components/Products/Products';
import AddMeal from './components/MealForm/AddMeal';


function App() {

  const [openAuthModal, setOpenAuthModal] = React.useState(false)
  const [openAddModal, setOpenAddModal] = React.useState(false)

  return (
    <div className="App">
      <nav>
        <div className='container'>
          <Header  handleOpenAuth={setOpenAuthModal} handleShowModal={setOpenAddModal} />   
        </div>
      </nav>
      <div className='container'>
        <Products  />
        <Modal show={openAuthModal} handleShowModal={setOpenAuthModal} >
          <Auth handleShowModal={setOpenAuthModal}  />
        </Modal>
        
        <Modal show={openAddModal} handleShowModal={setOpenAddModal} >
            <AddMeal handleShowModal={setOpenAddModal} />
        </Modal>
    
      </div>        
    </div>
  );
}

export default App;
