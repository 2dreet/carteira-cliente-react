import { Routes, Route,  } from 'react-router';
import BindUsers from '../pages/BindUsers';
import Customers from '../pages/Customers';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Products from '../pages/Products';
import Reports from '../pages/Reports';
import Sales from '../pages/Sales';
import Users from '../pages/Users';
import Wallet from '../pages/Wallet';

export const RoutesConfig = () => { 
  return (
    <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />    
          <Route path="/bind-users" element={<BindUsers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}

export default RoutesConfig;