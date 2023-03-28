import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './main/product-management/product-management.component';
import { AddProductComponent } from './main/product-management/add-product/add-product.component';

const routes: Routes = [
  {path:'', component:ProductManagementComponent, pathMatch:'full'},
  {path:'add-product', component:AddProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
