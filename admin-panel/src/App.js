import './App.css';
import { Routes, Route } from "react-router-dom";

import TopMenu from './components/TopMenu';
// import LandingPage from './components/LandingPage';
import Products from './components/products/Products';
// import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <h1 >Admin Panel</h1>
      <TopMenu />

      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/products" element={<Products />} />

        {/* 404 Page */}
        {/* <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} /> */}
      </Routes>
    </>
  );
}

export default App;
