import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Customer } from "../customer";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public URL: string = "http://localhost:3000/customers/"
  constructor(private http: HttpClient){
  }

  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.URL);
  }
}
