import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      product_name: ['', Validators.required],
      stock: [0, Validators.required],
      price: [0, Validators.required],
      photo: [''],
    });
  }

  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const productName: string = this.f.product_name.value;
    const stock: number = this.f.stock.value;
    const price: number = this.f.price.value;
    const photo: string = this.f.photo.value;
    const newProduct: Product = {
      id: 0,
      name: productName,
      stock: stock,
      price: price,
      photo: photo,
    };

    this.productService
      .addProducts(newProduct)
      .subscribe(() => this.router.navigate(['products']));
  }

  ngOnInit(): void {}
}
