import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  public title = "CUSTOMER DETAILS";
  public customers = [{}];
  routeSub: Subscription = new Subscription;
  searchInput = '';
  filteredList = [{}];
  varSort = 'id';
  confirmDelete = false;
  public customerForm: any;
  dialogConfig = new MatDialogConfig;

  constructor(private custService: CustomerService, private route: ActivatedRoute, private http: HttpClient, private matDialog: MatDialog) { }

  ngOnInit() {
    this.custService.getCustomers().subscribe(
      data => {
        this.customers = data;
        this.filteredList = this.customers
      });
  }
  // displayedColumns: string[] = ['id', 'fname', 'lname', 'email', 'address', 'state', 'city'];

  onDelete(id: string) {
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '250px';
    this.dialogConfig.height = '200px';
    this.dialogConfig.data = {
      selectedOption: 'delete'
    }
    let dialogRef = this.matDialog.open(DialogBodyComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.confirmDelete = data;
      if(this.confirmDelete){
        this.http.delete(this.custService.URL + id).subscribe();
      }
    });
  }

  onAdd(){
    this.dialogConfig.width='600px';
    this.dialogConfig.height='600px'
    this.dialogConfig.data = {
      selectedOption: 'add'
    }
    this.matDialog.open(DialogBodyComponent, this.dialogConfig);
  }

  onEdit(id: any){
    this.dialogConfig.width='600px';
    this.dialogConfig.height='600px'
    this.dialogConfig.data = {
      selectedOption: 'edit',
      custID: id
    }
    this.matDialog.open(DialogBodyComponent, this.dialogConfig);
  }

  sort() {
    if (this.varSort === 'id')
      this.varSort = 'fname';
    else
      this.varSort = 'id';
  }
  searchList(input: string) {
    this.searchInput = input;
    console.log(this.searchInput)
  }
}
