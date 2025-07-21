import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/service';
import { NgIf, NgFor } from '@angular/common';
import { GenericButtonComponent } from "../../shared/generic-button/generic-button.component";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgFor, GenericButtonComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  categories: any[] = [];
  existingImageUrl: string = '';
  selectedImage: File | null = null;
  submitting: boolean = false; // ✅ Added this line

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      image: [null]
    });
    this.loadCategories();
    this.loadProduct();
  }

  loadCategories() {
    this.apiService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  loadProduct() {
    this.apiService.getProductById(this.productId).subscribe((product: any) => {
      this.productForm.patchValue({
        title: product.title,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId
      });
      this.existingImageUrl = product.image;
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    this.submitting = true; // ✅ Start submitting

    const formData = new FormData();
    formData.append('title', this.productForm.value.title);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('categoryId', this.productForm.value.categoryId);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.apiService.updateProduct(this.productId, formData).subscribe({
      next: () => {
        alert('Product updated successfully');
        this.router.navigate(['/admin']);
      },
      error: () => {
        alert('Failed to update product');
      },
      complete: () => {
        this.submitting = false; // ✅ Reset after complete
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}

