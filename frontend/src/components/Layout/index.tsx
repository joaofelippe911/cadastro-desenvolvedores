import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";

import './style.scss';

export function Layout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="content-container">
        <Outlet />
      </div>
    </div>
  )
}
