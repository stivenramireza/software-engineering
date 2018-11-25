import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-ecn-cfn',
  templateUrl: './login-ecn-cfn.component.html',
  styleUrls: ['./login-ecn-cfn.component.scss']
})
export class LoginEcnCfnComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      ECN: ['', Validators.required],
      CFN: ['', Validators.required]
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

    this.apiService.authenticate(credentials);

    this.success = true;
  }

}
