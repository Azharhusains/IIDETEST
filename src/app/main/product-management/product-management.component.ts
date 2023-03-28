import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/core/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  constructor(private apiService: ApiServiceService,private toastr: ToastrService, private fb: FormBuilder) { }

  products:any;
  selectedProduct: any = {};
  ProdDetails:any

  AddForm!: FormGroup;

  ngOnInit(): void {
    this.getProducts();
  }

  initForm(){
    this.AddForm = this.fb.group({
      title:['', Validators.required]
    })
  }

  getProducts() {
    this.apiService.getProducts().subscribe(
      (res:any) =>{
        console.log(res)
        localStorage.setItem('data',JSON.stringify(res))
        this.products = res
      },(err:any) =>{
        console.log(err)
      }
    );
  }

  deleteProduct(id: number) {
    console.log(id)
    this.apiService.deleteProduct(id).subscribe(
      (res:any) =>{
        this.toastr.success('Data deleted');
        console.log(res);
        this.getProducts();
      },
      error => {
        console.log(error);
      }
    );
  }

  viewProduct(id: number){
    this.apiService.getProduct(id).subscribe(
      (res:any) =>{
        document.getElementById('exampl')?.click()
        console.log(res)
        this.ProdDetails = res
        console.log(this.ProdDetails);
      },(err:any) =>{
        console.log(err)
      }
    )
  }





}
