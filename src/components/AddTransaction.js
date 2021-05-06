import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const { addTransaction } = useContext(GlobalContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        addTransaction({
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: Number(amount)
        })

        setText('');
        setAmount(0);
    }

    return(
        <div>
            <h3>Add new transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Description</label>
                    <input 
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value) }                    
                    placeholder="Enter description..." 
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount<br />
                    (negative - expense, positive - income)
                    </label>
                    <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value) }
                    placeholder="Enter amount..." 
                    />
                </div>
                <button type='submit' className="btn">Add transaction</button>
            </form>
        </div>
    )
}

export default AddTransaction;