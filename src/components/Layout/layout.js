
import ReactDOM from "react-dom/client";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";



import "./layout.css";

function Layout() {


  return (
    <div className="Layout">

      <Outlet />


      <footer>
        Scandiweb Test Assignment
      </footer>

    </div>
  );
}

export default Layout;
