import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import 'boxicons'
import '@radix-ui/themes/styles.css';
import { Theme,ThemePanel } from '@radix-ui/themes';
import Info from './components/info'
import '@radix-ui/themes'
import Contact from './pages/Contact'
import Publicar from './pages/Publicar'
import ProtectedRoute from './utils/ProtectedRoute'
import {useLocalStorage} from 'react-use'


function App() {
const [user, setUser] = useLocalStorage('idUsuario')
  return (
    <>
    <Router>
      <Theme appearance='dark'>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/registro' element={<Register/>}></Route>
      <Route path='/info' element={<Contact/>}></Route>
      <Route element={<ProtectedRoute canActivate={user} redirectPath='/login' />}>
        <Route path='/publicar' element={<Publicar/>}></Route>
      </Route>
      </Routes>
      </Theme>
      <Info />
    </Router>
    </>
  )
}

export default App
