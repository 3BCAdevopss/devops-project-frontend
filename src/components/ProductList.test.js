import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from './ProductList';

const mockProducts = [
  {
    id: 1,
    productName: 'Phone',
    category: 'Electronics',
    costPrice: 100,
    sellingPrice: 200,
    profit: 100,
    margin: 50,
    description: 'Smart phone'
  },
  {
    id: 2,
    productName: 'Mouse',
    category: 'Electronics',
    costPrice: 50,
    sellingPrice: 100,
    profit: 50,
    margin: 50
  }
];

test('renders products correctly', () => {
  render(<ProductList products={mockProducts} onEdit={() => {}} search="" />);

  expect(
    screen.getAllByText((text) => text.toLowerCase().includes('phone'))[0]
  ).toBeInTheDocument();

  expect(
    screen.getByText((text) => text.toLowerCase().includes('mouse'))
  ).toBeInTheDocument();
});

test('edit button works', () => {
  const onEdit = jest.fn();

  render(<ProductList products={mockProducts} onEdit={onEdit} search="" />);

  const editButtons = screen.getAllByText('✏️');
  fireEvent.click(editButtons[0]);

  expect(onEdit).toHaveBeenCalled();
});

test('delete button renders', () => {
  render(<ProductList products={mockProducts} onEdit={() => {}} search="" />);

  const deleteButtons = screen.getAllByText('🗑️');
  expect(deleteButtons.length).toBeGreaterThan(0);
});