import React from 'react'
import { Widget, FileInfo } from "@uploadcare/react-widget";
import { useForm } from "react-hook-form";
import './addMeal.css';
import firebase from '../../config/Fire';

type props = {
    id:string
    title: string 
    measure: Partial<{ unit: string; value: number }> 
    price: number 
    emoji: string
    uploadcareId: string 
    handleShowModal:Function
}

export default function EditMeal({id, title, measure, price, emoji, uploadcareId, handleShowModal}:props) {
    const { register, handleSubmit, setValue } = useForm();

    const handleChange = (fileInfo:FileInfo) => {
        setValue("uploadcare", fileInfo);
      }
      
      React.useEffect(() => {
        register("uploadcare"); // custom register Antd input
      }, [register])
    
    const onSubmit = (data:any) => {
            const db = firebase.firestore()
            db.collection('meals').doc(id).set({
                title:data.title,
                category:data.category,
                price:parseInt(data.price),
                uploadcareId:data.uploadcare.uuid,
                emoji:data.emoji,
                measure:{
                    unit:data.unit,
                    value:parseInt(data.value)
                }
            })
            .then(()=>{
                handleShowModal(false)
            })
    }
    return (
        <div className='meal-form'>
        <h3>Новое блюдо</h3> 
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='meal-form__col'>
                <Widget
                    onChange={(fileInfo:FileInfo) => handleChange(fileInfo)}
                    publicKey='30506db15e8554c1cad3'
                    value={uploadcareId}
                />
            </div>
            <div className='meal-form__col'>
                <label htmlFor="title">Название</label>
                <input name="title" ref={register({ required: true })} defaultValue={title} />
            </div>
            <div className='meal-form__col'>
                <label htmlFor="category">Категория</label>
                <select name="category" ref={register} >
                    <option value="завтрак">завтрак</option>
                    <option value="обед">обед</option>
                    <option value="ужин">ужин</option>
                </select>
            </div>
            <div className='meal-form__col'>
                    <label htmlFor="price">Цена</label>
                    <input name="price" ref={register({ required: true })} defaultValue={price} />
            </div>
            <div className='meal-form__col'>
                    <label htmlFor="unit">Unit</label>
                    <input name="unit" ref={register({ required: true })} defaultValue = {measure.unit} />
            </div>
            <div className='meal-form__col'>
                    <label htmlFor="value">Value</label>
                    <input name="value" ref={register({ required: true })} defaultValue={measure.value} />
            </div>
            <div className='meal-form__col'>
                    <label htmlFor="emoji">emoji</label>
                    <input name="emoji" ref={register()} defaultValue={emoji} />
            </div>
                <button type="submit" className='meal-form__submit'>Сохранить</button>      
         </form>
    </div>

    )
}
