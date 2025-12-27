import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductItem from './ProductItem';
import ProductForm from './ProductForm';

const ProductList = () => {
    const { products, loading, fetchProducts, currentPage, totalPages } = useProducts();
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchProducts(page);
        }
    };

    if (loading && products.length === 0) {
        return (
            <div className="spinner"></div>
        );
    }

    return (
        <div className="container p-4">
            <div className="card">
                <div className="card-header">
                    <h2 className="text-center">Products Management</h2>
                </div>

                <div className="card-body">
                    <div className="mb-4">
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn btn-primary"
                        >
                            Add New Product
                        </button>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center p-5">
                            <p className="mb-3">No products found.</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="btn btn-primary"
                            >
                                Add Your First Product
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="table-container">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <ProductItem
                                                key={product._id}
                                                product={product}
                                                onEdit={handleEdit}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center items-center mt-4 gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="btn btn-primary"
                                >
                                    Previous
                                </button>
                                <span className="px-4">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="btn btn-primary"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onClose={handleFormClose}
                />
            )}
        </div>
    );
};

export default ProductList;