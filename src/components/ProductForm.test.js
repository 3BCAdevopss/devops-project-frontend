import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductForm from './ProductForm';
import ProductService from '../services/ProductService';

jest.mock('../services/ProductService');

describe('ProductForm', () => {
  beforeEach(() => {
    ProductService.createProduct.mockResolvedValue({ data: {} });
    ProductService.updateProduct.mockResolvedValue({ data: {} });
  });

  test('shows validation errors on submit', async () => {
    const onProductSaved = jest.fn();
    render(<ProductForm onProductSaved={onProductSaved} />);

    fireEvent.click(screen.getByRole('button', { name: /add product/i }));

    expect(await screen.findByText(/product name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/valid cost price is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/valid selling price is required/i)).toBeInTheDocument();
    expect(onProductSaved).not.toHaveBeenCalled();
  });

  test('submits new product and resets form', async () => {
    const onProductSaved = jest.fn();
    render(<ProductForm onProductSaved={onProductSaved} />);

    await userEvent.type(screen.getByLabelText(/product name/i), 'Laptop');
    await userEvent.type(screen.getByLabelText(/cost price/i), '100');
    await userEvent.type(screen.getByLabelText(/selling price/i), '150');

    fireEvent.click(screen.getByRole('button', { name: /add product/i }));

    await waitFor(() => {
      expect(ProductService.createProduct).toHaveBeenCalledWith({
        productName: 'Laptop',
        costPrice: 100,
        sellingPrice: 150,
        category: '',
        description: ''
      });
      expect(onProductSaved).toHaveBeenCalled();
    });
  });

  test('submits update for edited product', async () => {
    const onProductSaved = jest.fn();
    const onCancel = jest.fn();

    render(
      <ProductForm
        productToEdit={{ id: 12, productName: 'Old', costPrice: 10, sellingPrice: 15 }}
        onProductSaved={onProductSaved}
        onCancel={onCancel}
      />
    );

    await userEvent.clear(screen.getByLabelText(/product name/i));
    await userEvent.type(screen.getByLabelText(/product name/i), 'Updated');

    fireEvent.click(screen.getByRole('button', { name: /update product/i }));

    await waitFor(() => {
      expect(ProductService.updateProduct).toHaveBeenCalledWith(12, expect.objectContaining({
        productName: 'Updated'
      }));
      expect(onProductSaved).toHaveBeenCalled();
    });
  });
});
