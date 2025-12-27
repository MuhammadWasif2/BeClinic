import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Admin Dashboard
            </Link>

            <div className="nav-links">
                {isAuthenticated ? (
                    <>
                        <Link to="/products" className="nav-link">
                            Products
                        </Link>
                        <span className="nav-link">
                            Welcome, {user?.name}
                        </span>
                        <button onClick={handleLogout} className="btn btn-danger">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                        <Link to="/register" className="nav-link">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;