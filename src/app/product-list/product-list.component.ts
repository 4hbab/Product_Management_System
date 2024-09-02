import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, ReactiveFormsModule, AddProductComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchControl = new FormControl('');
  currentPage = 1;
  pageSize = 10;
  Math = Math;
  editingProduct: Product | null = null;
  showAddProduct = false;

  ngOnInit() {
    this.loadProducts();
    this.applyFilter();
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    } else {
      this.products = [];
    }
    this.filteredProducts = [...this.products];
  }

  applyFilter() {
    this.searchControl.valueChanges.subscribe((value) => {
      this.filteredProducts = this.products.filter((product) =>
        product.productName.toLowerCase().includes(value?.toLowerCase() || '')
      );
      this.currentPage = 1;
    });
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredProducts.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
    this.showAddProduct = true;
  }

  deleteProduct(product: Product) {
    if (confirm(`Are you sure you want to delete ${product.productName}?`)) {
      this.products = this.products.filter((p) => p !== product);
      this.saveProductsToLocalStorage();
      this.loadProducts();
    }
  }

  saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  onProductSaved(product: Product) {
    if (this.editingProduct) {
      const index = this.products.findIndex(
        (p) => p.productName === this.editingProduct?.productName
      );
      if (index !== -1) {
        this.products[index] = product;
      }
    } else {
      this.products.push(product);
    }
    this.saveProductsToLocalStorage();
    this.loadProducts();
    this.showAddProduct = false;
    this.editingProduct = null;
  }

  cancelEdit() {
    this.showAddProduct = false;
    this.editingProduct = null;
  }
}
