import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup;
  categories: string[] = [
    'Electronics',
    'Apparel',
    'Beauty Products',
    'Home Decor',
  ];
  isAddingNewCategory = false;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      newCategory: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      image: [''],
      quantity: ['', [Validators.required, Validators.min(1)]],
      itemCreateDate: ['', Validators.required],
    });

    this.productForm.get('category')?.valueChanges.subscribe((value) => {
      this.isAddingNewCategory = value === 'new';
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;

      if (this.isAddingNewCategory) {
        this.categories.push(newProduct.newCategory);
        newProduct.category = newProduct.newCategory;
      }

      // Save the product details to local storage
      this.saveProduct(newProduct);

      // Reset the form after submission
      this.productForm.reset();
      this.isAddingNewCategory = false;
    }
  }

  saveProduct(product: any) {
    let products = JSON.parse(localStorage.getItem('products') || '[]');

    // Check for the category limit (no more than 10 products in the same category)
    const categoryCount = products.filter(
      (p: any) => p.category === product.category
    ).length;
    if (categoryCount >= 10) {
      alert('Cannot add more than 10 products in the same category.');
      return;
    }

    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    console.log('Product saved to local storage:', product);
  }
}
