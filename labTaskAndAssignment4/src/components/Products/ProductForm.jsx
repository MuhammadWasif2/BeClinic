import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';

const ProductForm = ({ product, onClose }) => {
    const { createProduct, updateProduct } = useProducts();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                price: product.price || '',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                name: formData.name,
                price: parseFloat(formData.price),
            };

            if (product) {
                await updateProduct(product._id, productData);
            } else {
                await createProduct(productData);
            }

            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}>
            <div className="modal-content" style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '2rem',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
            }}>
                <div className="modal-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                }}>
                    <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#666',
                        }}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Enter price"
                        />
                    </div>

                    <div className="form-actions" style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '1.5rem',
                    }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ flex: 1 }}
                        >
                            {loading ? 'Saving...' : (product ? 'Update' : 'Create')}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn"
                            style={{
                                flex: 1,
                                backgroundColor: '#e5e7eb',
                                color: '#374151',
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;