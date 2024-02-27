import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'api/products';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.url}/${id}`;
    return this.http.get<Product>(url);
  }

  updateProducts(products: Product): any {
    return this.http
      .put<Product>(this.url + '/' + products.id, products, this.httpOptions)
      .pipe(catchError(this.handleError<Product>('updateProducts')));
  }

  addProducts(products: Product): Observable<Product> {
    return this.http
      .post<Product>(this.url, products, this.httpOptions)
      .pipe(catchError(this.handleError<Product>('addProducts')));
  }

  deleteProducts(products: Product): Observable<Product> {
    const url = `${this.url}/${products.id}`;
    return this.http
      .delete<Product>(url, this.httpOptions)
      .pipe(
        catchError(
          this.handleError<Product>(`deleteProducts id=${products.id}`)
        )
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return throwError(error);
    };
  }
}
