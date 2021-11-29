import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private  httpClient: HttpClient) { 
  }

  postProduct(data:any){
    return this.httpClient.post<any>("http://localhost:3000/posts", data)
    .pipe(map((res:any)=>{
      return res;
    }))
}
  getProduct(){
  return this.httpClient.get<any>("http://localhost:3000/posts")
  .pipe(map((res:any)=>{
    return res;
  }))
}
updateProduct(data:any,id: number){
  return this.httpClient.put<any>("http://localhost:3000/posts/"+id,data)
  .pipe(map((res:any)=>{
    return res;
  }))
}
deleteProduct(id: any){
  return this.httpClient.delete<any>("http://localhost:3000/posts/"+id)
  .pipe(map((res:any)=>{
    return res;
  }))
}
}
