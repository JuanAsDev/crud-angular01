import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    const products = [
      { id: 1, name: 'samsung', stock: 30, price: 3500000, photo: 'example' },
      { id: 2, name: 'xiaomi', stock: 40, price: 5500000, photo: 'example' },
      { id: 3, name: 'oppo', stock: 50, price: 6500000, photo: 'example' },
    ];
    return { products };
  }
  genId(products: Product[]): number {
    return products.length > 0
      ? Math.max(...products.map((p) => p.id)) + 1
      : 11;
  }
}
