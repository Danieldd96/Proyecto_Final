import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route></Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
