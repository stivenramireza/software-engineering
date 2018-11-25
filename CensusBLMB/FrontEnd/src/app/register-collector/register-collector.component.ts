import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-register-collector',
  templateUrl: './register-collector.component.html',
  styleUrls: ['./register-collector.component.scss']
})
export class RegisterCollectorComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    const credentials = {};
    for (var key in this.messageForm.controls) {
      if (this.messageForm.controls.hasOwnProperty(key)) {
        credentials[key] = this.messageForm.controls[key].value;
      }
    }

    this.apiService.registerCollector(credentials);

    this.success = true;
  }

}
