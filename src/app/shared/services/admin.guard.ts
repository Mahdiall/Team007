// import {ActivatedRouteSnapshot, Router} from '@angular/router';
// import {AuthService} from './../services/auth.service';
// import {RouterStateSnapshot} from '@angular/router';
// import {CanActivate} from '@angular/router';
// import {Injectable} from '@angular/core';
// import {UserService} from './user.service';
//
// @Injectable()
// export class AdminAuthGuard implements CanActivate {
//
//   constructor(private auth: AuthService, private router: Router, private us: UserService) {
//   }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
//     this.us.get(this.auth.userId).subscribe(
//       (user) => {
//         if (user && user.isAdmin) {
//           return true;
//         }
//         return false;
//         //this.router.navigate(['about']);
//       });
//
//   }


//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean>|Promise<boolean>|boolean {
//     if
//   }
// }
 //}
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import {UserService} from './user.service';



@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user.map((user) => {
      if (user ) return true;
      this.router.navigate(['access-denied']);;
    });
  }
}

