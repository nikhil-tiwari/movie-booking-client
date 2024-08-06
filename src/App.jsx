import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home/Home'
import SignUp from './screens/Signup/SignUp'
import SignIn from './screens/Signin/SignIn'
import { useCurrentUser } from './hooks/query/user'

function App() {

  const { user } = useCurrentUser();

  console.log('Current user', user);

  return (
    <Routes>
      <Route path='/' element={<Home userProfile={user} />} />
      <Route path='/signup' element={<SignUp />}/>  
      <Route path='/signin' element={<SignIn />}/> 
    </Routes>
  )
}

export default App
