# Product List Component

## Overview

The Product List component is a standalone Angular component that displays a list of products, allows filtering and pagination, and provides functionality to add, edit, and delete products.

## Files

The component consists of three main files:

1. `product-list.component.ts`: TypeScript file containing the component logic
2. `product-list.component.html`: HTML template for the component
3. `product-list.component.css`: CSS styles for the component

## Features

- Display a list of products with their details (name, category, quantity, unit price, total)
- Add new products
- Edit existing products
- Delete products
- Search/filter products
- Pagination
- Responsive design

## Component Structure

### TypeScript (product-list.component.ts)

The `ProductListComponent` class handles the following:

- Initializing and managing the list of products
- Implementing search functionality
- Handling pagination
- Managing product editing and deletion
- Saving products to local storage

Key methods:

- `loadProducts()`: Loads products from local storage
- `applyFilter()`: Filters products based on search input
- `editProduct()`: Prepares a product for editing
- `deleteProduct()`: Removes a product from the list
- `saveProductsToLocalStorage()`: Persists products to local storage
- `onProductSaved()`: Handles saving new or edited products

### HTML Template (product-list.component.html)

The template provides the structure for:

- Product list table
- Search input
- Add product button
- Pagination controls

### CSS (product-list.component.css)

The CSS file includes:

- Responsive styles for mobile devices
- Custom button styles
- Search input styles

## Usage

To use this component in your Angular application:

1. Import the `ProductListComponent` in your module or standalone component.
2. Add `<app-product-list></app-product-list>` to your template where you want the product list to appear.

## Dependencies

This component relies on:

- Angular Common Module
- Angular Reactive Forms Module
- A separate `AddProductComponent` for adding/editing products

## Local Storage

The component uses the browser's local storage to persist product data. This allows the data to be retained between sessions without the need for a backend server.

## Responsive Design

The component includes responsive design considerations:

- Adjusts table font size and padding for smaller screens
- Uses horizontal scrolling for the table on mobile devices

## Styling

The component uses Tailwind CSS utility classes for styling, as evident from the `@apply` directives in the CSS file.

## Future Improvements

Potential enhancements for this component could include:

- Server-side data persistence
- More advanced filtering options (e.g., by category, price range)
- Sorting functionality for columns
- Export functionality (e.g., to CSV)
- Integration with a state management solution for larger applications
