import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MemberListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    constructor(private userServive: UserService, private router: Router,
                private alertify: AlertifyService) {}

    resolve(): Observable<User[]> {
       return this.userServive.getUsers(this.pageNumber, this.pageSize).pipe(
           catchError(error => {
               this.alertify.error(error);
               this.router.navigate(['/home']);
               return of(null);
           })
       ) ;
    }
}
