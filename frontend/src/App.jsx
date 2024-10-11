import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import 'boxicons'
import '@radix-ui/themes/styles.css';
import { Theme,ThemePanel } from '@radix-ui/themes';
import Info from './components/info'
import '@radix-ui/themes'
import Acerca from './pages/Acerca'
import Contacto from './pages/Contacto'
import Publicar from './pages/Publicar'
import ProtectedRoute from './utils/ProtectedRoute'
import {useLocalStorage} from 'react-use'
import Bicicletas from './pages/Bicicletas'
import Accesorios from './pages/Accesorios'
import Producto from './pages/Producto'
import Carrito from './pages/Carrito'
import Facturas from './pages/Facturas'
import MisProductos from './pages/MisProductos'
import Servicios from './pages/Servicios'
import CalendMante from './pages/CalendMante'
import Tutoriales from './pages/Tutoriales'

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
      <Route path='/info' element={<Acerca/>}></Route>
      <Route path='/contacto' element={<Contacto/>}></Route>
      <Route element={<ProtectedRoute canActivate={user} redirectPath='/login' />}>
        <Route path='/publicar' element={<Publicar/>}></Route>
        <Route path='/facturas' element={<Facturas/>}></Route>
        <Route path='/mis-productos' element={<MisProductos/>}></Route>
        <Route path='/calendario' element={<CalendMante/>}></Route>
      </Route>
      <Route path='/bicicletas' element={<Bicicletas/>}></Route>
      <Route path='/accesorios' element={<Accesorios/>}></Route>
      <Route path='/producto/:nombre' element={<Producto/>}></Route>
      <Route path='/carrito' element={<Carrito/>}></Route>
      <Route path='/servicios' element={<Servicios/>}></Route>
      <Route path='/tutoriales' element={<Tutoriales/>}></Route>
      </Routes>
      </Theme>
      <Info />
    </Router>
    </>
  )
}

export default App
