import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import './ProductForm.css';

const ProductForm = ({ productToEdit, onProductSaved, onCancel }) => {
    const [product, setProduct] = useState({
        productName: '',
        costPrice: '',
        sellingPrice: '',
        category: '',
        description: ''
    });

    const [errors, setErrors] = useState({});
    const [calculatedValues, setCalculatedValues] = useState({
        profit: 0,
        margin: 0
    });

    useEffect(() => {
        if (productToEdit) {
            setProduct({
                productName: productToEdit.productName || '',
                costPrice: productToEdit.costPrice || '',
                sellingPrice: productToEdit.sellingPrice || '',
                category: productToEdit.category || '',
                description: productToEdit.description || ''
            });
        } else {
            resetForm();
        }
    }, [productToEdit]);

    useEffect(() => {
        const cost = parseFloat(product.costPrice) || 0;
        const selling = parseFloat(product.sellingPrice) || 0;
        const profit = selling - cost;
        const margin = cost !== 0 ? (profit / cost) * 100 : 0;

        setCalculatedValues({
            profit: profit,
            margin: margin
        });
    }, [product.costPrice, product.sellingPrice]);

    const resetForm = () => {
        setProduct({
            productName: '',
            costPrice: '',
            sellingPrice: '',
            category: '',
            description: ''
        });
        setErrors({});
        setCalculatedValues({ profit: 0, margin: 0 });
    };

    const validate = () => {
        const newErrors = {};

        if (!product.productName.trim()) {
            newErrors.productName = 'Product name is required';
        }

        if (!product.costPrice || parseFloat(product.costPrice) < 0) {
            newErrors.costPrice = 'Valid cost price is required';
        }

        if (!product.sellingPrice || parseFloat(product.sellingPrice) < 0) {
            newErrors.sellingPrice = 'Valid selling price is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
        // Clear error for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const productData = {
                ...product,
                costPrice: parseFloat(product.costPrice),
                sellingPrice: parseFloat(product.sellingPrice)
            };

            if (productToEdit) {
                await ProductService.updateProduct(productToEdit.id, productData);
            } else {
                await ProductService.createProduct(productData);
            }

            resetForm();
            onProductSaved();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product. Please try again.');
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value || 0);
    };

    return (
        <div className="product-form-container">
            <div className="form-header">
                <h2>{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="productName">
                            Product Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={product.productName}
                            onChange={handleChange}
                            className={errors.productName ? 'error' : ''}
                            placeholder="Enter product name"
                        />
                        {errors.productName && <span className="error-message">{errors.productName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            placeholder="e.g., Electronics, Clothing"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="costPrice">
                            Cost Price <span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            id="costPrice"
                            name="costPrice"
                            value={product.costPrice}
                            onChange={handleChange}
                            className={errors.costPrice ? 'error' : ''}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                        />
                        {errors.costPrice && <span className="error-message">{errors.costPrice}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="sellingPrice">
                            Selling Price <span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            id="sellingPrice"
                            name="sellingPrice"
                            value={product.sellingPrice}
                            onChange={handleChange}
                            className={errors.sellingPrice ? 'error' : ''}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                        />
                        {errors.sellingPrice && <span className="error-message">{errors.sellingPrice}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Enter product description (optional)"
                        rows="3"
                    />
                </div>

                <div className="calculated-values">
                    <div className="calc-item">
                        <span className="calc-label">Profit:</span>
                        <span className={`calc-value ${calculatedValues.profit >= 0 ? 'positive' : 'negative'}`}>
                            {formatCurrency(calculatedValues.profit)}
                        </span>
                    </div>
                    <div className="calc-item">
                        <span className="calc-label">Margin:</span>
                        <span className={`calc-value ${calculatedValues.margin >= 0 ? 'positive' : 'negative'}`}>
                            {calculatedValues.margin.toFixed(2)}%
                        </span>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-submit">
                        {productToEdit ? 'Update Product' : 'Add Product'}
                    </button>
                    {productToEdit && (
                        <button type="button" onClick={onCancel} className="btn btn-cancel">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
