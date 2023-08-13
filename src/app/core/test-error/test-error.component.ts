import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/envioronments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  get400ValidationError() {
    return this.http.get(`${this.baseUrl}products/fortyFive`).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.error(err)
    );
  }
  get404Error() {
    return this.http.get(`${this.baseUrl}products/444`).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.error(err)
    );
  }
  get500Error() {
    return this.http.get(`${this.baseUrl}buggy/servererror`).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.error(err)
    );
  }

  get400Error() {
    return this.http.get(`${this.baseUrl}buggy/badrequest`).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.error(err)
    );
  }
}
