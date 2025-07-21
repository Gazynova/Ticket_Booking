import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule ,Location} from '@angular/common';
import { ApiService } from '../../services/service';
import { GenericButtonComponent } from '../../shared/generic-button/generic-button.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GenericButtonComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  productForm: FormGroup;
  categories: { id: number; name: string }[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private location: Location
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      categoryId: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.api.getAllCategories().subscribe({
      next: (res) => (this.categories = res),
      error: () => alert('Failed to load categories'),
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.productForm.invalid) return;
    this.submitting = true;

    const formData = new FormData();
    formData.append('Title', this.productForm.value.title);
    formData.append('Description', this.productForm.value.description);
    formData.append('Price', this.productForm.value.price);
    formData.append('CategoryId', this.productForm.value.categoryId);
    formData.append('Image', this.productForm.value.image);

    this.api.addProduct(formData).subscribe({
      next: () => {
        alert('Product added successfully');
        this.router.navigate(['/admin']);
      },
      error: () => alert('Failed to add product'),
      complete: () => (this.submitting = false),
    });
  }

    goBack() {
    this.router.navigate(['/admin']);
  }

  // goBack() {
  //   this.location.back();
  // }
}
