import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../models/product';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchControl = new FormControl('');
  currentPage = 1;
  pageSize = 10;
  Math: any;

  ngOnInit() {
    this.loadProducts();
    this.applyFilter();
  }

  loadProducts() {
    // Retrieve products from localStorage
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
}
