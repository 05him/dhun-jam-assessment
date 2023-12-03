import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AdminLogin } from './pages/AdminLogin/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard/AdminDashboard';

import { useAdmin } from './context/AdminContext/AdminContext';
import { NotFound, Unauthorized } from './pages/OtherRoutes/OtherRoutes';

function App() {

  const { isLoggedIn } = useAdmin();

  return (
    <div className="App">
     <Routes>
        <Route path='/' element={ <AdminLogin/> } />
        <Route path='/dashboard' element={ isLoggedIn ? <AdminDashboard /> : <Unauthorized /> } />
        <Route path='*' element={ <NotFound /> } />
     </Routes>
    </div>
  );
}

export default App;
