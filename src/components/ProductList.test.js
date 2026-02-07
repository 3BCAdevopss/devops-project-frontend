import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductList from './ProductList';
import ProductService from '../services/ProductService';

jest.mock('../services/ProductService');

describe('ProductList', () => {
  beforeEach(() => {
    ProductService.getAllProducts.mockResolvedValue({ data: [] });
    ProductService.searchProducts.mockResolvedValue({ data: [] });
    ProductService.deleteProduct.mockResolvedValue({});
  });

  test('renders products and handles edit click', async () => {
    const onEdit = jest.fn();
    ProductService.getAllProducts.mockResolvedValue({
      data: [
        {
          id: 1,
          productName: 'Phone',
          category: 'Electronics',
          costPrice: 200,
          sellingPrice: 350,
          profit: 150,
          margin: 75,
          description: 'Test'
        }
      ]
    });

    render(<ProductList onEdit={onEdit} />);

    await waitFor(() => {
      expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle(/edit/i));
    expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  test('searches products when typing', async () => {
    render(<ProductList onEdit={jest.fn()} />);

    const input = await screen.findByPlaceholderText(/search products/i);
    await userEvent.type(input, 'lap');

    await waitFor(() => {
      expect(ProductService.searchProducts).toHaveBeenCalled();
    });
  });

  test('deletes product when confirmed', async () => {
    const onEdit = jest.fn();
    ProductService.getAllProducts.mockResolvedValue({
      data: [{ id: 5, productName: 'Mouse', costPrice: 10, sellingPrice: 15, profit: 5, margin: 50 }]
    });
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    render(<ProductList onEdit={onEdit} />);

    await waitFor(() => {
      expect(screen.getByText('Mouse')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTitle(/delete/i));

    await waitFor(() => {
      expect(ProductService.deleteProduct).toHaveBeenCalledWith(5);
    });

    window.confirm.mockRestore();
  });
});
