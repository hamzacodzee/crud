import './App.css';
import AddUser from './components/AddUser.jsx';
import DisplayData from './components/DisplayData.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserEdit from './components/UserEdit.jsx';

function App() {


  return (
    <div className="App">
      <h1>React Redux Practice</h1>

      <div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DisplayData />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/edit" element={<UserEdit />} />
          </Routes>
        </BrowserRouter>



      </div>
    </div>

  );
}

export default App;
