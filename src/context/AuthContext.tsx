import React, {createContext, useReducer } from 'react';
import {IState, action} from '../types/types';



const initialState:IState = {
  user:null,
}

export const AuthContext = createContext<IState | any>(initialState);


function reducer(state:IState,action:action){
    switch (action.type) {
        case 'LOGIN':
            return {...state, user:action.payload }
        case 'LOGOUT':
            return {...state, user:null }
        default:
            return state;
    }
}


export function AuthContextProvider(props:JSX.ElementChildrenAttribute){
    const [state, dispatch] = useReducer(reducer, initialState)
    return <AuthContext.Provider value={{state, dispatch}}>{props.children}</AuthContext.Provider>
}
