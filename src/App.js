import ToDoListScreen from './screens/ToDoListScreen/ToDoListScreen';
import CreateToDoScreen from './screens/CreateToDoScreen/CreateToDoScreen';
import EditToDoScreen from './screens/EditToDoScreen/EditToDoScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ToDoListScreen />} />
        <Route path='/create' element={<CreateToDoScreen />} />
        <Route path='/edit/:id' element={<EditToDoScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
