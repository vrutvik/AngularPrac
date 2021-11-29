import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder} from  '@angular/forms';
import{ Validators } from '@angular/forms';
import { ProductServiceService } from '../service/product-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductModel } from '../product-dashboard/product-dashboard.model';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
  
})

export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,private formbuilder: FormBuilder, private api : ProductServiceService) { }
  formValue !: FormGroup;
  productModelObj : ProductModel = new ProductModel();
  productData : any; 
  ngOnInit() {
    this.formValue = this.formbuilder.group(
      {
        prod_id : 0,
        name:'',
        description:'',
        price:'',
        availability:'', 
      }
    )
    this.getAllProducts();
    throw new Error('Method not implemented.');
  }
  getAllProducts(){
    this.api.getProduct()
    .subscribe(res=>{
this.productData = res;
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}