import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<string>();
  searchInput ='';
  form!: FormGroup;

  constructor(private fb: FormBuilder ) {
       
  }

  ngOnInit(){
    this.form = this.fb.group({
      search: ''
    });
    this.form.get('search')!
    .valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe((data: string) => {this.searchInput = data;
    this.onSearch()});
  }
  
  onSearch(){
    this.searchEvent.emit(this.searchInput)
  }
  
}
