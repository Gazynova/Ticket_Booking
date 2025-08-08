import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';
import { Observable } from 'rxjs';
import { CartItem, Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Product APIs
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/${id}`);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/product`, formData);
  }

  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/product/${id}`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/${id}`);
  }

  // Cart APIs
  // getCart(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/cart`);
  // }

  getCart(userId: string) {
    return this.http.get<CartItem[]>(`${environment.apiUrl}/cart/${userId}`);
  }

  addToCart(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/add`, body);
  }

  removeFromCart(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${id}`);
  }

  updateCartQuantity(cartItemId: number, quantity: number) {
    return this.http.put(`${this.apiUrl}/Cart/update-quantity`, {
      cartItemId,
      quantity,
    });
  }

  CartCount(userID: string) {
    return this.http.get<number>(`${this.apiUrl}/cart/count/${userID}`);
  }

  //Categories API
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/category`);
  }

  getCategoryById(id: number) {
    return this.http.get(`${this.apiUrl}/category/${id}`);
  }

  addCategory(category: any) {
    return this.http.post(`${this.apiUrl}/category`, category);
  }

  updateCategory(id: number, category: any) {
    return this.http.put(`${this.apiUrl}/category/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}/category/${id}`);
  }
  //Login APi
  login(payload: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, payload);
  }
}
