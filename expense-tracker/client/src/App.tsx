import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import ExpenseTracker from './components/ExpenseTracker';
import ShowList from './components/ShowList';
function App() {
  return (
    <div className="App">
     {/* <h1>Expense tracker coming up</h1> */}
     <Router>
           <Routes>
                 <Route path='/add' element={< ExpenseTracker onClose={() => {}} onTrue={() => {}}/>}></Route>
                 <Route path='/' element={< ShowList />}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;