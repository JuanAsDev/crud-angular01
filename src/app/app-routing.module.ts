import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddProductsComponent } from './components/products/add-products.component';
import { EditProductsComponent } from './components/products/edit-products.component';
const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'add', component: AddProductsComponent },
  { path: 'update/:id', component: EditProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
