import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductService from './services/ProductService';
import './App.css';

function App() {
  const [productToEdit, setProductToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [products, setProducts] = useState([]);

  // ✅ Search state
  const [search, setSearch] = useState("");

  const [totalProfit, setTotalProfit] = useState(0);
  const [avgMargin, setAvgMargin] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllProducts();

      const data = response.data || [];
      setProducts(data);

      let totalP = 0;
      let totalM = 0;

      if (data.length > 0) {
        data.forEach(product => {
          totalP += product?.profit || 0;
          totalM += product?.margin || 0;
        });

        setTotalProfit(totalP);
        setAvgMargin(totalM / data.length);
      } else {
        setTotalProfit(0);
        setAvgMargin(0);
      }

    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // ✅ prevent crash
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

  //  SAFE FILTER (NO ERROR)
  const filteredProducts = products.filter((product) => {
    const name =
      product?.name ||
      product?.productName ||
      "";

    return name.toLowerCase().includes(search.toLowerCase());
  });

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

            {/* ✅ SEARCH BAR */}
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: "10px",
                  width: "250px",
                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
              />
            </div>

            {/* ✅ PASS SEARCH + FILTERED DATA */}
            <ProductList 
              key={refreshKey}
              onEdit={handleEdit}
              products={filteredProducts}
              search={search}   // 🔥 needed for highlight
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