import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  formCredentials: Object;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.apiService.createForm().subscribe(
      res => this.formCredentials = { ECN: res['user']['ECN'], CFN: res['user']['CFN'] },
      err => console.log("Couldn't register form")
    );
  }

}
