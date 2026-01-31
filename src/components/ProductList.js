import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import './ProductList.css';

const ProductList = ({ onEdit }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await ProductService.getAllProducts();
            setProducts(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await ProductService.deleteProduct(id);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        if (value.trim() === '') {
            fetchProducts();
        } else {
            try {
                const response = await ProductService.searchProducts(value);
                setProducts(response.data);
            } catch (error) {
                console.error('Error searching products:', error);
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

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">{error}</div>
                <button onClick={fetchProducts} className="btn btn-primary">Retry</button>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            {products.length === 0 ? (
                <div className="no-products">
                    <p>No products found. Add your first product to get started!</p>
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
                                        <div className="product-name">{product.productName}</div>
                                        {product.description && (
                                            <div className="product-description">{product.description}</div>
                                        )}
                                    </td>
                                    <td>
                                        {product.category && (
                                            <span className="category-badge">{product.category}</span>
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
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="btn btn-delete"
                                                title="Delete"
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
