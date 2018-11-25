import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly endpoint = environment.serverEndpoint;

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  public authenticate(credentials: Object) {
    return this.httpClient.post(`${this.endpoint}/authenticate`, credentials)
      .subscribe(data => {
        if (data['success']) {
          this.storeUserData(data['user'], data['token']);
          this.router.navigate(['']);
        } else {
          this.router.navigate(['login']);
        }
      });
  }

  public registerCollector(credentials: Object) {
    this.post('registerCollector', credentials)
      .subscribe(
        res => this.router.navigate(['']),
        err => console.log("Couldn't post to registerCollector")
      );
  }

  public createForm() {
    return this.post('registerFormAndRespondent', {});
  }

  public updateForm(fields: Object) {
    return this.post('updateForm', fields);
  }

  public getFirstPage() {
    return this.get('firstPage');
  }

  public getSecondPage() {
    return this.get('secondPage');
  }

  public getThirdPage() {
    return this.get('thirdPage');
  }

  public getFourthPage() {
    return this.get('fourthPage');
  }

  private post(route: String, object: Object) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', localStorage.getItem('token'));
    return this.httpClient.post(`${this.endpoint}/${route}`, object, { headers });
  }

  private get(route: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', localStorage.getItem('token'));
    return this.httpClient.get(`${this.endpoint}/${route}`, { headers });
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  private storeUserData(user: Object, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

}
