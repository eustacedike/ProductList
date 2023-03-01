
import ReactDOM from "react-dom/client";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/layout";
import ProductList from "./components/ProductList/ProductList";
import AddProduct from "./components/AddProduct/AddProduct";



import './App.css';



function App() {




  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
           

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
