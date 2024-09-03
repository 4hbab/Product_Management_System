# Product Management System - Documentation

## Overview

The **Product Management System** is a web-based application designed to manage products, including functionalities like adding new products, updating existing ones, deleting products, and searching through the list of products. This project is built using modern web technologies including Angular for the frontend and localStorage for the database.

### Features

- **Add Products**: Users can add new products with details such as name, price, and description.
- **Edit Products**: Existing products can be edited to update their information.
- **Delete Products**: Products can be removed from the system.
- **Search Products**: The system allows users to search for products based on the product name.

## Prerequisites

Before you can run the project, ensure that you have the following software installed on your local machine:

- **Node.js** (version 18.x or later)
- **Angular CLI** (version 15.x or later)
- **Git** (for version control)

## Getting Started

### 1. Clone the Repository

Begin by cloning the repository to your local machine:

```bash
git clone https://github.com/4hbab/Product_Management_System.git
cd Product_Management_System
```

### 2. Install Dependencies

Navigate to the `product_management_system` directory and install the required Angular packages:

```bash
cd product_management_system
npm install
```

### 3. Start the Frontend Application

Next, start the Angular application:

```bash
cd product_management_system
ng serve
```

The application will start running on `http://localhost:4200`.

### 4. Access the Application

Once the application is running, you can access the application by opening a web browser and navigating to:

```
http://localhost:4200
```

## Project Structure

- **/product_management_system**: This directory contains the Angular frontend code.
  - **/src**: Contains the source code for the Angular application.
    - **/app**: Contains the core application components and services.

## Contributing

Contributions are welcome! Please follow the guidelines below:

- Fork the repository.
- Create a new branch (`git checkout -b feature-branch`).
- Commit your changes (`git commit -am 'Add new feature'`).
- Push to the branch (`git push origin feature-branch`).
- Create a new Pull Request.

## License

This project is licensed under the MIT License.

---
