import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductService from './services/ProductService';
import './App.css';

function App() {
  const [productToEdit, setProductToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [avgMargin, setAvgMargin] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
      
      // Calculate total profit and average margin
      let totalP = 0;
      let totalM = 0;
      if (response.data.length > 0) {
        response.data.forEach(product => {
          totalP += product.profit || 0;
          totalM += product.margin || 0;
        });
        setTotalProfit(totalP);
        setAvgMargin(totalM / response.data.length);
      } else {
        setTotalProfit(0);
        setAvgMargin(0);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
  };

  const handleProductSaved = () => {
    setProductToEdit(null);
    setRefreshKey(oldKey => oldKey + 1);
  };

  const handleCancel = () => {
    setProductToEdit(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value || 0);
  };

  return (
    <div className="App">
      <div className="dashboard-header">
        <div className="header-top">
          <div className="header-title">
            <span className="header-label">PROFIT MARGIN ANALYZER</span>
            <h1>Understand and optimize your margins in real time.</h1>
            <p className="header-description">
              Track product costs, selling prices, profit, and margin – then iterate quickly with built-in CRUD controls.
            </p>
          </div>
          <div className="header-stats">
            <div className="stat-box">
              <span className="stat-label">Total profit</span>
              <span className="stat-value">{formatCurrency(totalProfit)}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Avg margin</span>
              <span className="stat-value">{avgMargin.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-grid">
          <div className="form-section">
            <div className="section-header">
              <span className="section-label">MANAGE</span>
              <h2>Add new product</h2>
            </div>
            <ProductForm 
              productToEdit={productToEdit}
              onProductSaved={handleProductSaved}
              onCancel={handleCancel}
              compact={true}
            />
          </div>

          <div className="list-section">
            <div className="section-header">
              <span className="section-label">PRODUCTS</span>
              <h2>Portfolio overview</h2>
            </div>
            <ProductList 
              key={refreshKey}
              onEdit={handleEdit}
              products={products}
            />
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <p>© 2026 Profit Margin Analyzer Platform | Built with Spring Boot & React</p>
      </footer>
    </div>
  );
}

export default App;
