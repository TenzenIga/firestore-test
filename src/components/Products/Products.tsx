import React, { useEffect, useState } from 'react'
import firebase from '../../config/Fire';
import { Meal } from '../../types/types';
import ProductCard from './ProductCard';
import './product.css';


export default function Products() {
    const [meals, setMeals] = useState<Meal[]>([])
    
    useEffect(()=> {
            const db = firebase.firestore();
            db.collection('meals').onSnapshot((snapshot)=>{
                const mealsData:any = [];
                snapshot.forEach(doc =>{
                    let newItem = doc.data();
                    newItem.id = doc.id;
                    mealsData.push(newItem);
                })

                setMeals(mealsData)
                
            });
            
    }, [])
    const onDelete = (id:string) =>{
        const db = firebase.firestore()
        db.collection('meals').doc(id).delete()
    }
    const breakfast = meals.map((meal:any)=>{
       if(meal.category === 'завтрак'){
            return <ProductCard 
            id={meal.id}
            key={meal.id} 
            title={meal.title} 
            price={meal.price} 
            measure={meal.measure} 
            emoji={meal.emoji} 
            uploadcareId={meal.uploadcareId}
            deleteMeal ={onDelete} 
        />
       }
       return null;
    })
    const dinner = meals.map((meal:any)=>{
       if(meal.category === 'обед'){
            return <ProductCard 
            id={meal.id}
            key={meal.id} 
            title={meal.title} 
            price={meal.price} 
            measure={meal.measure} 
            emoji={meal.emoji} 
            uploadcareId={meal.uploadcareId}
            deleteMeal ={onDelete} 
        />
       }
       return null;
    })

    const supper = meals.map((meal:any)=>{
       if(meal.category === 'ужин'){
            return <ProductCard 
            id={meal.id}
            key={meal.id} 
            title={meal.title} 
            price={meal.price} 
            measure={meal.measure} 
            emoji={meal.emoji} 
            uploadcareId={meal.uploadcareId}
            deleteMeal ={onDelete} 
        />
       }
       return null;
    })
 
    return (
        <div>
            {breakfast && <h2>Завтрак</h2>}
            {breakfast}
            {dinner &&  <h2>Обед</h2> }
            {dinner}
            {supper && <h2>Ужин</h2>}
            {supper}
        </div>
    )
}
