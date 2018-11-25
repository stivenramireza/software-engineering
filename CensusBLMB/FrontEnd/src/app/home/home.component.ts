import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userType: Object;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    const userAsString = localStorage.getItem('user');
    if (userAsString) {
      this.userType = JSON.parse(userAsString).type;
      console.log(this.userType);
    } else {
      this.userType = null;
    }
  }

}
