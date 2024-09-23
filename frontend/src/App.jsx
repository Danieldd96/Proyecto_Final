import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <>
    <Router>
        <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/registro' element={<Register/>}></Route>
        </Routes>
    </Router>
    </>
  )
}

export default App
