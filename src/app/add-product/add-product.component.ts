import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../models/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Input() editProduct: Product | null = null;
  @Output() productSaved = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

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
  }

  ngOnInit() {
    this.productForm.get('category')?.valueChanges.subscribe((value) => {
      this.isAddingNewCategory = value === 'new';
      if (this.isAddingNewCategory) {
        this.productForm.get('newCategory')?.setValidators(Validators.required);
      } else {
        this.productForm.get('newCategory')?.clearValidators();
      }
      this.productForm.get('newCategory')?.updateValueAndValidity();
    });

    if (this.editProduct) {
      this.productForm.patchValue(this.editProduct);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (this.isAddingNewCategory) {
        this.categories.push(product.newCategory);
        product.category = product.newCategory;
      }

      // Check if there are already 10 products in the same category
      const existingProducts = JSON.parse(
        localStorage.getItem('products') || '[]'
      );
      const productsInSameCategory = existingProducts.filter(
        (p: Product) => p.category === product.category
      );

      if (productsInSameCategory.length >= 10) {
        alert('Cannot add more than 10 products in the same category.');
        return;
      }

      this.productSaved.emit(product);
      this.productForm.reset();
      this.isAddingNewCategory = false;
    } else {
      this.markFormGroupTouched(this.productForm);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  // Helper method to mark all controls in a form group as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper methods to check field validity
  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'This field is required';
      }
      if (field.errors['min']) {
        return `Minimum value is ${field.errors['min'].min}`;
      }
    }
    return '';
  }
}
