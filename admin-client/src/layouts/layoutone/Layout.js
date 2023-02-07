import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './layout.css';
const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="d-flex flex-column" style={{ flex: 6 }}>
        <Topbar />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
