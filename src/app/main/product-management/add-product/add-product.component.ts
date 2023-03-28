import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/core/api-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  

  constructor(private apiService: ApiServiceService,private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }

  products:any;
  selectedProduct: any = {};
  submit = false;

  AddForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
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

  get f1(){return this.AddForm.controls}
  onSubmit() {
    if(this.AddForm.invalid){
      this.submit = true;
      return;
    }else{
      console.log(this.AddForm.value)
    if (this.selectedProduct.id) {
      this.apiService.updateProduct(this.selectedProduct).subscribe(
        data => {
          this.selectedProduct = {};
          this.getProducts();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.apiService.createroduct(this.AddForm.value).subscribe(
        (res:any) =>{
          console.log(res)
          this.toastr.success('Data Added')
          this.router.navigateByUrl('')
        },
        error => {
          console.log(error);
        }
      );
    }
    }
}

}
