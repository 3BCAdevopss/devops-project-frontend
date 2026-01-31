import axios from 'axios';

const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/products';

class ProductService {
    getAllProducts() {
        return axios.get(API_BASE_URL);
    }

    getProductById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    }

    createProduct(product) {
        return axios.post(API_BASE_URL, product);
    }

    updateProduct(id, product) {
        return axios.put(`${API_BASE_URL}/${id}`, product);
    }

    deleteProduct(id) {
        return axios.delete(`${API_BASE_URL}/${id}`);
    }

    searchProducts(name) {
        return axios.get(`${API_BASE_URL}/search`, {
            params: { name }
        });
    }

    getProductsByCategory(category) {
        return axios.get(`${API_BASE_URL}/category/${category}`);
    }
}

const productService = new ProductService();
export default productService;
