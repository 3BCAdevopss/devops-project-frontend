import React from 'react';
import ProductService from '../services/ProductService';
import './ProductList.css';

const ProductList = ({ products = [], onEdit, search = "" }) => {

    // ✅ HIGHLIGHT FUNCTION
    const highlightText = (text, search) => {
        if (!search) return text;

        const regex = new RegExp(`(${search})`, "gi");
        const parts = String(text).split(regex);

        return parts.map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <mark key={index}>{part}</mark>
            ) : (
                part
            )
        );
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await ProductService.deleteProduct(id);
                window.location.reload(); // simple refresh
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value || 0);
    };

    const formatPercentage = (value) => {
        return `${(value || 0).toFixed(2)}%`;
    };

    return (
        <div className="product-list-container">

            {products.length === 0 ? (
                <div className="no-products">
                    <p>No products found.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Cost Price</th>
                                <th>Selling Price</th>
                                <th>Profit</th>
                                <th>Margin %</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="product-name">
                                            {highlightText(
                                                product?.productName || product?.name || "",
                                                search
                                            )}
                                        </div>

                                        {product.description && (
                                            <div className="product-description">
                                                {highlightText(product.description, search)}
                                            </div>
                                        )}
                                    </td>

                                    <td>
                                        {product.category && (
                                            <span className="category-badge">
                                                {highlightText(product.category, search)}
                                            </span>
                                        )}
                                    </td>

                                    <td>{formatCurrency(product.costPrice)}</td>
                                    <td>{formatCurrency(product.sellingPrice)}</td>

                                    <td className={product.profit >= 0 ? 'profit-positive' : 'profit-negative'}>
                                        {formatCurrency(product.profit)}
                                    </td>

                                    <td className={product.margin >= 0 ? 'margin-positive' : 'margin-negative'}>
                                        {formatPercentage(product.margin)}
                                    </td>

                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => onEdit(product)}
                                                className="btn btn-edit"
                                            >
                                                ✏️
                                            </button>

                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="btn btn-delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductList;