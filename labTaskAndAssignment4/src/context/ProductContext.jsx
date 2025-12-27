import React, { createContext, useState, useContext } from 'react';
import { productService } from '../services/productService';
import toast from 'react-hot-toast';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const data = await productService.getAllProducts(page);
            setProducts(data);
            setCurrentPage(page);
            // Note: You might want to modify your backend to return total count
            // For now, we'll just set a dummy totalPages
            setTotalPages(5); // Adjust based on your backend response
        } catch (error) {
            toast.error('Failed to fetch products');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (productData) => {
        try {
            const newProduct = await productService.createProduct(productData);
            setProducts([...products, newProduct]);
            toast.success('Product created successfully');
            return newProduct;
        } catch (error) {
            toast.error(error.response?.data || 'Failed to create product');
            throw error;
        }
    };

    const updateProduct = async (id, productData) => {
        try {
            const updatedProduct = await productService.updateProduct(id, productData);
            setProducts(products.map(p => p._id === id ? updatedProduct : p));
            toast.success('Product updated successfully');
            return updatedProduct;
        } catch (error) {
            toast.error(error.response?.data || 'Failed to update product');
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        try {
            await productService.deleteProduct(id);
            setProducts(products.filter(p => p._id !== id));
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error('Failed to delete product');
            throw error;
        }
    };

    const value = {
        products,
        loading,
        currentPage,
        totalPages,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};