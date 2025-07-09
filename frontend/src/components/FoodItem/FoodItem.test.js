// FoodItem.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FoodItem from './FoodItem';
import { StoreContext } from '../../context/StoreContext';

const mockStore = {
    cartItems: {},
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    url: 'http://example.com',
};

describe('FoodItem Component', () => {
    beforeEach(() => {
        render(
            <StoreContext.Provider value={mockStore}>
                <FoodItem 
                    id={1}
                    name="Pizza"
                    price={200}
                    description="Delicious cheese pizza"
                    image="pizza.png"
                />
            </StoreContext.Provider>
        );
    });

    test('renders food item name', () => {
        const nameElement = screen.getByText(/Pizza/i);
        expect(nameElement).toBeInTheDocument();
    });

    test('renders food item price', () => {
        const priceElement = screen.getByText(/Rs200/i);
        expect(priceElement).toBeInTheDocument();
    });

    test('renders food item description', () => {
        const descriptionElement = screen.getByText(/Delicious cheese pizza/i);
        expect(descriptionElement).toBeInTheDocument();
    });

    test('renders food item image', () => {
        const imageElement = screen.getByAltText('');
        expect(imageElement).toHaveAttribute('src', 'http://example.com/images/pizza.png');
    });

    test('calls addToCart when add icon is clicked', () => {
        const addIcon = screen.getByAltText(''); // Adjust based on your actual alt text
        fireEvent.click(addIcon);
        expect(mockStore.addToCart).toHaveBeenCalledWith(1); // Check if it calls addToCart with the correct id
    });

    test('renders counter when item is in cart', () => {
        mockStore.cartItems[1] = 2; // Simulate that the item is in the cart
        render(
            <StoreContext.Provider value={mockStore}>
                <FoodItem 
                    id={1}
                    name="Pizza"
                    price={200}
                    description="Delicious cheese pizza"
                    image="pizza.png"
                />
            </StoreContext.Provider>
        );

        const counterElement = screen.getByText(/2/i);
        expect(counterElement).toBeInTheDocument();
    });

    test('calls removeFromCart when remove icon is clicked', () => {
        mockStore.cartItems[1] = 2; // Simulate that the item is in the cart
        render(
            <StoreContext.Provider value={mockStore}>
                <FoodItem 
                    id={1}
                    name="Pizza"
                    price={200}
                    description="Delicious cheese pizza"
                    image="pizza.png"
                />
            </StoreContext.Provider>
        );

        const removeIcon = screen.getByAltText(''); // Adjust based on your actual alt text for the remove icon
        fireEvent.click(removeIcon);
        expect(mockStore.removeFromCart).toHaveBeenCalledWith(1); // Check if it calls removeFromCart with the correct id
    });
});
