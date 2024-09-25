import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthProvider from './contexts/AuthProvider'
import Home from './pages/Home'

function App() {

  return (
    <>
    <Router>
      <AuthProvider>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/registro' element={<Register/>}></Route>
      </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App
