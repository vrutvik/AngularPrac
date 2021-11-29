import { Component, OnInit } from '@angular/core';
import { FormBuilder} from  '@angular/forms';
import {FormGroup} from '@angular/forms';
import{ Validators } from '@angular/forms';
import { ProductServiceService } from '../service/product-service.service';
import { ProductModel } from './product-dashboard.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit {

  closeResult = '';
  formValue !: FormGroup;
  productModelObj : ProductModel = new ProductModel();
  productData : any; 
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api : ProductServiceService) {}
  ngOnInit(): void {
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
  displayStyle = "none";
  
  postProductDetails(){
    this.productModelObj.prod_id = this.formValue.value.prod_id;
    this.productModelObj.name = this.formValue.value.name;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.price = this.formValue.value.price;
    this.productModelObj.availability = this.formValue.value.availability;

    this.api.postProduct(this.productModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Awesome!!! Your Product Added Successfully! ");
      this.submitPopup();
      this.formValue.reset;
      this.getAllProducts();
    })
  }
  getAllProducts(){
    this.api.getProduct()
    .subscribe(res=>{
this.productData = res;
    })
  }
  deleteProduct(row: any){
    this.api.deleteProduct(row.id)
    .subscribe(res=>{
     alert("Product Deleted!!");
     this.getAllProducts();
    })
  }
  clickAddProduct(){
    this.openPopup();
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  onEdit(row: any){
    this.displayStyle = "block";
    this.productModelObj.id = row.id;
    this.showAdd = false;
    this.showUpdate = true;
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
