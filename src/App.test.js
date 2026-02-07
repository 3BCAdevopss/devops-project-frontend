import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import ProductService from './services/ProductService';

jest.mock('./components/ProductForm', () => () => <div data-testid="product-form" />);
jest.mock('./components/ProductList', () => () => <div data-testid="product-list" />);
jest.mock('./services/ProductService');

describe('App', () => {
  beforeEach(() => {
    ProductService.getAllProducts.mockResolvedValue({ data: [] });
  });

  test('renders dashboard content and empty stats', async () => {
    render(<App />);

    expect(screen.getByText('PROFIT MARGIN ANALYZER')).toBeInTheDocument();
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();

    await waitFor(() => {
      expect(ProductService.getAllProducts).toHaveBeenCalled();
      expect(screen.getByText('$0.00')).toBeInTheDocument();
      expect(screen.getByText('0.00%')).toBeInTheDocument();
    });
  });

  test('calculates total profit and average margin', async () => {
    ProductService.getAllProducts.mockResolvedValue({
      data: [
        { profit: 10, margin: 20 },
        { profit: 30, margin: 40 }
      ]
    });

    render(<App />);

    await waitFor(() => {
      expect(ProductService.getAllProducts).toHaveBeenCalled();
      expect(screen.getByText('$40.00')).toBeInTheDocument();
      expect(screen.getByText('30.00%')).toBeInTheDocument();
    });
  });
});
