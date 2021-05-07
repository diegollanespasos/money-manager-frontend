import './App.css';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import Header from './components/Header';
import { GlobalProvider } from './context/GlobalState'; 

function App() {
  return (
    <GlobalProvider>
      <div className='window'>
          <Header />       
          <div className="container">
            <Balance />
            <IncomeExpenses />
            <TransactionList />
            <AddTransaction />
          </div>
      </div>
    </GlobalProvider>
  );
}

export default App;