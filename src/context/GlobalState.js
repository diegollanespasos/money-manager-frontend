import  { createContext, useReducer } from 'react';
import { AppReducer } from './AppReducer';

const initialState = {
    transactions: [
          { id: 1, text: 'Pizza', amount: -150 },
          { id: 2, text: 'Project 1', amount: 5000 },
          { id: 3, text: 'Keyboard', amount: -1000 },
          { id: 4, text: 'Project 2', amount: 2000 }      
    ]
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children } ) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (
            <GlobalContext.Provider value={{ 
                transactions: state.transactions,
                deleteTransaction,
                addTransaction
             }}>
                {children}
            </GlobalContext.Provider>
        )
}