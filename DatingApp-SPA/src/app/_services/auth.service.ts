import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = environment.apiUrl + 'auth/';
decodedText: any;
currentUser: User;
photoUrl = new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

helper = new JwtHelperService();

changeMemberPhoto(photoUrl: string) {
  this.photoUrl.next(photoUrl);
}

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedText = this.helper.decodeToken(user.token);
        this.currentUser = user.user;
        this.changeMemberPhoto(this.currentUser.photoUrl);
      }
    })
  );
}

register(user: User) {
  return this.http.post(this.baseUrl + 'register', user);
}

isLoggedIn() {
  const token = localStorage.getItem('token');
  return !this.helper.isTokenExpired(token);
}

}
