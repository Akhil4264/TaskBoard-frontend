import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/Pages/LoginPage';
import AdminPage from './components/Pages/AdminPage';
import TeamPage from './components/Pages/TeamPage';
import UserPage from './components/Pages/UserPage';
import ForgotPass from "./components/Pages/ForgotPass";
import EmployeePage from "./components/Pages/EmployeePage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={LoginPage}></Route>
      <Route path='/forgot-password' Component={ForgotPass}></Route>
      <Route path='/admin' Component={AdminPage}></Route>
      <Route path='/admin/teams/:id' Component={TeamPage}>AdminTaskPage</Route>
      <Route path='/admin/user/:id' Component={UserPage}>UserPage</Route>
      <Route path='/employee' Component={EmployeePage}>UserPage</Route>
    </Routes>
    
    </BrowserRouter>
    // <></>
  );
}

export default App;
