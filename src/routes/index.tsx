import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateUser from '../pages/CreateUser';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import User from '../pages/User';

const RoutesConfig: React.FC = () => (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<User />} />
        <Route path="/users/create" element={<CreateUser />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesConfig;