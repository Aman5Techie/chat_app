import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/Register'
import Chat from './pages/chat'
import SetAvatar from './pages/setAvatar'
// import './App.css'

function App() {
  return (
   <BrowserRouter>
    <Routes>

      <Route path='/login'  element={<Login/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
      <Route path='/setAvatar' element={<SetAvatar/>}></Route>
      <Route path='/' element={<Chat/>} ></Route>
    </Routes>
   
   </BrowserRouter>
 
  )
}

export default App
