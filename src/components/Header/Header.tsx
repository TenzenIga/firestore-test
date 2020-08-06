import React from 'react'
import fire from '../../config/Fire';
import './header.css';
import { AuthContext } from '../../context/AuthContext';



type props = {

    handleOpenAuth:Function,
    handleShowModal:Function
}

 export default function Header({ handleOpenAuth, handleShowModal}:props) {

    const {state, dispatch} = React.useContext(AuthContext);
    const { user } = state;
    
    React.useEffect(() => {
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
              dispatch({type:'LOGIN', payload: user})
            }else{
              dispatch({type:'LOGOUT'})
            }
          })
      }, [])

    const logOut = ()=>{
        fire.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }
    return (
            <header>
               
            {
                user ?
                <>
                    <button onClick={()=>handleShowModal(true)}>Добавить</button> <button onClick={()=>logOut()} >Log out</button></> 
                    :
                    <button  onClick={()=>handleOpenAuth(true)} className='login' >Login</button>
            }
            </header>
           
    )
}
