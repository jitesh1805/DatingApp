import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = 'http://localhost:5000/api/auth/';
decodedText: any;
constructor(private http: HttpClient) { }

helper = new JwtHelperService();

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedText = this.helper.decodeToken(user.token);
        console.log(this.decodedText);
      }
    })
  );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

isLoggedIn() {
  const token = localStorage.getItem('token');
  return !this.helper.isTokenExpired(token);
}

}
