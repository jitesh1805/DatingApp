import { Injectable } from "@angular/core";
import { Resolve, Router } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private authservice: AuthService,
                private router: Router, private alertify: AlertifyService) {}

    resolve(): Observable<User> {
        
        return this.userService.getUser(this.authservice.decodedText.nameid).pipe(
            catchError(error =>{
                this.alertify.error('Error occur while profile edit');
                this.router.navigate(['\home']);
                return of(null);
            })
        );
    }
}
