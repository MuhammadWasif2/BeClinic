import React from 'react';
import { useProducts } from '../../context/ProductContext';

const ProductItem = ({ product, onEdit }) => {
    const { deleteProduct } = useProducts();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(product._id);
        }
    };

    return (
        <tr>
            <td className="font-medium">{product.name}</td>
            <td className="font-bold text-blue-600">
                ${parseFloat(product.price).toFixed(2)}
            </td>
            <td>
                <div style={{ display: "flex", gap: 10 }}>
                    <button
                        onClick={() => onEdit(product)}
                        className="btn btn-success"
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="btn btn-danger"
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ProductItem;