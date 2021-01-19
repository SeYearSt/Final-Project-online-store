import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public myApi = 'http://localhost:3000/api/admin/';

  constructor(private http: HttpClient) { }

  public getAllCategories() {
    return this.http.get(this.myApi + 'get-all-categories', { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } });
  }
  public addProduct(product: any) {
    return this.http.post<any>(this.myApi + 'add-product', product, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } });
  }
  public updateProduct(product:any){
    return this.http.put<any>(this.myApi + 'update-product', product, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } });
  }

  public deleteProduct(product:any) {
    return this.http.post<any>(this.myApi + 'delete-product', product, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } });
  }

}
