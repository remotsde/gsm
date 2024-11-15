import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Customers from '../pages/Customers';

describe('Customers Component', () => {
  it('renders customers page', () => {
    render(
      <Provider store={store}>
        <Customers />
      </Provider>
    );
    
    expect(screen.getByText('Customers')).toBeDefined();
  });

  it('opens add customer modal', () => {
    render(
      <Provider store={store}>
        <Customers />
      </Provider>
    );
    
    const addButton = screen.getByText('Add Customer');
    fireEvent.click(addButton);
    
    expect(screen.getByText('Add New Customer')).toBeDefined();
  });

  it('filters customers based on search', () => {
    render(
      <Provider store={store}>
        <Customers />
      </Provider>
    );
    
    const searchInput = screen.getByPlaceholderText('Search customers...');
    fireEvent.change(searchInput, { target: { value: 'Sarah' } });
    
    expect(screen.getByText('Sarah Johnson')).toBeDefined();
  });
});