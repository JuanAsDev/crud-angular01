import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  getProduct() {
    this.productService.getProducts().subscribe({
      next: (v) => (this.products = v),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  addProduct() {
    this.router.navigate(['add']);
  }

  editProduct(id: number) {
    this.router.navigate(['update', id]);
  }

  deleteProduct(product: Product) {
    this.productService.deleteProducts(product).subscribe(() => {
      this.products = this.products.filter((p) => p !== product);
    });
  }

  ngOnInit(): void {
    this.getProduct();
  }
}
