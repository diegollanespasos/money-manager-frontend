import  { createContext, useReducer } from 'react';
import { AppReducer } from './AppReducer';

const initialState = {
    transactions: [],
    error: null,
    loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children } ) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getTransactions() {
        try {
            const response = await fetch('http://localhost:5000/api/transactions');
            const transactions = await response.json();
            
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: transactions.data
            })

        } catch(error){
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await fetch(`http://localhost:5000/api/transactions/${id}`, { method: 'DELETE' });
            
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })

        } catch(error){
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    async function addTransaction(transaction) {
        try {

            const response = await fetch('http://localhost:5000/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(transaction)
            })
            const addedTransaction = await response.json();

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: addedTransaction.data
            })
        } catch(error){
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    return (
            <GlobalContext.Provider value={{ 
                transactions: state.transactions,
                error: state.error,
                loading: state.loading,
                deleteTransaction,
                addTransaction,
                getTransactions
             }}>
                {children}
            </GlobalContext.Provider>
        )
}