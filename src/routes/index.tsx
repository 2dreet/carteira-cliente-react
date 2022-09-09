import { Routes, Route,  } from 'react-router';
import CreateUser from '../pages/CreateUser';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Users from '../pages/Users';

export const RoutesConfig = () => { 
  return (
    <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
    </Routes>
  );
}

export default RoutesConfig;