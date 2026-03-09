 // making this in mobile view
 import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import WatchPost from './pages/WatchPost'

 const App = () => {
   return (
    
    <Router>
      <Routes>
        <Route path='/CreatePost' element={<CreatePost/>}/> 
        <Route path='/WatchPost' element={<WatchPost/>}/> 
      </Routes>
    </Router>

   )
 }
 
 export default App