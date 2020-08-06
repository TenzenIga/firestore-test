import React, { useState } from 'react'
import { Modal } from '../Modal/Modal'
import EditMeal from '../MealForm/EditMeal'
import { AuthContext } from '../../context/AuthContext'

type props = {
    id:string
    title: string 
    measure: Partial<{ unit: string; value: number }> 
    price: number 
    emoji: string
    uploadcareId: string 
    deleteMeal:Function
    
}


export default function ProductCard({id, title, measure, price, emoji, uploadcareId, deleteMeal}:props) {
    const { state } = React.useContext(AuthContext);
    const { user } = state;

    const [openEditModal, setOpenEditModal] = useState(false)
    return (
        <div className='meal'>
            <picture>
                <source srcSet={`https://ucarecdn.com/${uploadcareId}/`}></source>
                <img src={`https://ucarecdn.com/${uploadcareId}/`} alt={title} />
            </picture>
            {
                user
                &&
                <div className='meal-controls'>
                    <button onClick={()=>setOpenEditModal(true)}>edit</button>
                    <button onClick={()=>deleteMeal(id)}>x</button>
                </div>
            }
         
            <div className='meal-info'>
                <h3 className='meal-title'>
                    {title}
                    <span className='text-secondary'>  {measure.value} {measure.unit}</span>
                </h3>
                <div className='meal-button'>
                    <button>{price} ₽</button>  
                    {emoji && <p>{emoji}</p>}
                </div>
            </div>
            <Modal show={openEditModal} handleShowModal={setOpenEditModal} >
                <EditMeal  
                    id={id}
                    title={title} 
                    price={price} 
                    measure={measure} 
                    emoji={emoji} 
                    uploadcareId={uploadcareId}
                    handleShowModal={setOpenEditModal}
                    />
                    
            </Modal>
        </div>
    )
}
