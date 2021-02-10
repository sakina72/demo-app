import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from '../customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {
  customerForm: FormGroup | undefined;
  selectedOption: any;
  title = 'Add Details'
  customer: Customer[] = [];
  id: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogBodyComponent>, private http: HttpClient, public router: Router, private custService: CustomerService) {
    this.selectedOption = data.selectedOption;
    if (this.selectedOption !== 'delete') {
      this.customerForm = new FormGroup({
        id: new FormControl('', Validators.required),
        fname: new FormControl('', Validators.required),
        lname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required)
      });
    }
    if (this.selectedOption === 'edit') {
      this.id = data.custID;
    }
  }

  ngOnInit() {
    this.isEdit();
  }

  onSubmit() {
    if (this.selectedOption === 'add') {
      this.http.post<Customer>(this.custService.URL, this.customerForm!.value).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }

    if (this.selectedOption === 'edit') {
      this.http.put<Customer>((this.custService.URL + this.id), this.customerForm!.value).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );

    }

    alert('Customer Data Added.');
    this.router.navigateByUrl("/customer-details");
  }

  isEdit() {
    if (this.selectedOption === 'edit') {
      this.title = "Edit Details";
      this.http.get(this.custService.URL + this.id).subscribe(data => {
        this.customerForm!.patchValue(data);
      })
    }
  }

  closeDelete(data: any) {
    this.dialogRef.close(data);
  }

}
