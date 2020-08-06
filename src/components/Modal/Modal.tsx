import React from 'react'
import './modal.css';


type props = {
    handleShowModal:Function
    show:boolean
    children:React.ReactNode
}
export const Modal = ({children, show, handleShowModal}:props) => {
    const handleClose = (e:React.MouseEvent)=>{
        if(e.target !== e.currentTarget) return;
        handleShowModal(false)
    
    } 
    return (
    <>   
            {show ? (<div onClick={(e)=>handleClose(e)} className='modal'>{children} </div>) : null}
    </>   
    )
}
