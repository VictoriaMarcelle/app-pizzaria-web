import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts() {
    return this.httpClient.get(`${API}/produto`);
  }

  getById(id: number) {
    return this.httpClient.get(`${API}/produto/${id}`);
  }

  updateProduct(id: number, product: any) {
    return this.httpClient.put(`${API}/produto/${id}`, product);
  }

  saveProduct(product: any) {
    return this.httpClient.post(`${API}/produto`, product);
  }
}
