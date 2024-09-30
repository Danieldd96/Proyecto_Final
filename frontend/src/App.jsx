import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthProvider from './contexts/AuthProvider'
import Home from './pages/Home'
import 'boxicons'
import '@radix-ui/themes/styles.css';
import { Theme,ThemePanel } from '@radix-ui/themes';
import Info from './components/info'
import '@radix-ui/themes'
import Contact from './pages/Contact'
import Publicar from './pages/Publicar'


function App() {
Contact
  return (
    <>
    <Router>
      <Theme appearance='dark'>
      <AuthProvider>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/registro' element={<Register/>}></Route>
      <Route path='/info' element={<Contact/>}></Route>
      <Route path='/publicar' element={<Publicar/>}></Route>
      </Routes>
      </AuthProvider>
      </Theme>
      <Info />
    </Router>
    </>
  )
}

export default App
