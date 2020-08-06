import React from 'react'
import fire from '../../config/Fire'
import firebase from 'firebase';
import './auth.css';
import { AuthContext } from '../../context/AuthContext';

type props = {
    handleShowModal:Function,

}



export default function Auth({handleShowModal}:props) {
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [code, setCode] = React.useState('')
    const [show, setShow] = React.useState(false) //show input for mobile code
    const { dispatch} = React.useContext(AuthContext)
    
    React.useEffect(() => {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",
      {
         size:"invisible"
          // other options
      });
      return () => {
        window.recaptchaVerifier.clear()
      }
    }, [])

    const handleAuth = ()=>{
      
        const appVerifier = window.recaptchaVerifier;
        fire.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {     
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            setShow(true)
        }).catch(function (error) {
          
          console.log(error);
          // Error; SMS not sent
          // ...
        });
       
      }
    
      const confirCode = ()=>{
        window.confirmationResult.confirm(code).then(function (result:any) {
          // User signed in successfully.
          dispatch({type:"LOGIN", payload:result.user})
          handleShowModal(false)
          // ...
        }).catch(function (error:any) {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
          
        });
        
      }

    return (
      <div className="auth">
          <h3>Номер телефона</h3>
          <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='+7 900 000 00 00' />
          <button  onClick ={()=>handleAuth()} disabled={!phoneNumber}>Получить код</button>
          {
            show && 
            <>
              <h3>Код</h3>
              <input  value={code} onChange={(e)=>setCode(e.target.value)} />
              <button onClick={()=>confirCode()} disabled={!code}>Продолжить</button>
            </>
          }
        <div id="recaptcha-container"></div>
      </div>
      
    )
}
