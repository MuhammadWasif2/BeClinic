import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { useAuth } from './context/AuthContext';

// Lazy load components for better performance
const Layout = React.lazy(() => import('./components/Layout/Layout'));
const Login = React.lazy(() => import('./components/Auth/Login'));
const Register = React.lazy(() => import('./components/Auth/Register'));
const ProductList = React.lazy(() => import('./components/Products/ProductList'));

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <React.Suspense fallback={<div className="spinner"></div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={
                  <ProtectedRoute>
                    <Navigate to="/products" replace />
                  </ProtectedRoute>
                } />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="products" element={
                  <ProtectedRoute>
                    <ProductList />
                  </ProtectedRoute>
                } />
              </Route>
            </Routes>
          </React.Suspense>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;