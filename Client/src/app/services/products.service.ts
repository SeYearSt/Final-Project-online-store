import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product';
import { variable } from '@angular/compiler/src/output/output_ast';
import { HttpHeaders } from '@angular/common/http';
//import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public myApi = 'http://localhost:3000/api/products/';
  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.myApi + "get-all-products", { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } });
  }

  public searchProduct(name: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.myApi + "search-product/" + name, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } });
  }

}
