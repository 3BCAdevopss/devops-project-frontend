import ProductService from './ProductService';
import axios from 'axios';

jest.mock('axios');

describe('ProductService', () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    axios.put.mockReset();
    axios.delete.mockReset();
  });

  test('getAllProducts calls base url', () => {
    ProductService.getAllProducts();
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/products');
  });

  test('getProductById calls detail url', () => {
    ProductService.getProductById(5);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/products/5');
  });

  test('createProduct posts payload', () => {
    const payload = { productName: 'Mouse' };
    ProductService.createProduct(payload);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/products', payload);
  });

  test('updateProduct puts payload', () => {
    const payload = { productName: 'Monitor' };
    ProductService.updateProduct(3, payload);
    expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/api/products/3', payload);
  });

  test('deleteProduct calls delete url', () => {
    ProductService.deleteProduct(7);
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/products/7');
  });

  test('searchProducts calls search endpoint', () => {
    ProductService.searchProducts('lap');
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/products/search', {
      params: { name: 'lap' }
    });
  });

  test('getProductsByCategory calls category endpoint', () => {
    ProductService.getProductsByCategory('Electronics');
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/products/category/Electronics');
  });
});
