import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder} from  '@angular/forms';
import{ Validators } from '@angular/forms';
import { ProductServiceService } from '../service/product-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductModel } from '../product-dashboard/product-dashboard.model';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
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
  displayStyle = "none";
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

  onEdit(row: any){
    this.displayStyle = "block";
    this.productModelObj.id = row.id;
    this.formValue.controls['prod_id'].setValue(row.prod_id);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['price'].setValue(row.price);
    this.formValue.controls['availability'].setValue(row.availability);
  }

  updateProduct(){
    this.productModelObj.prod_id = this.formValue.value.prod_id;
    this.productModelObj.name = this.formValue.value.name;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.price = this.formValue.value.price;
    this.productModelObj.availability = this.formValue.value.availability;
    this.api.updateProduct(this.productModelObj, this.productModelObj.id)
    .subscribe(res=>{
      alert("Details Updated Successfully");
      this.closePopup();
      this.formValue.reset;
      this.getAllProducts();
    })
    
  }
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  submitPopup() {
    this.displayStyle = "none";
  }

}