import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
})
export class EditProductsComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.productService.getProduct(params['id']).subscribe((res: Product) => {
        this.product = res;
        this.form = this.formBuilder.group({
          product_id: [this.product.id],
          product_name: [this.product.name, Validators.required],
          stock: [this.product.stock, Validators.required],
          price: [this.product.price, Validators.required],
          photo: [this.product.photo],
        });
      });
    });
  }

  get f() {
    return this.form?.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const id: number = this.f?.['product_id'].value;
    const name: string = this.f?.['product_name'].value;
    const stock: number = this.f?.['stock'].value;
    const price: number = this.f?.['price'].value;
    const photo: string = this.f?.['photo'].value;

    const updatedProduct: Product = {
      id: id,
      name: name,
      stock: stock,
      price: price,
      photo: photo,
    };

    this.productService
      .updateProducts(updatedProduct)
      .subscribe(() => this.router.navigate(['products']));
  }

  ngOnInit(): void {}
}
