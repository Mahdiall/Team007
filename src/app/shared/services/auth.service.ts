import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import * as firebase from 'firebase';



@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  provider = new firebase.auth.GoogleAuthProvider();
  authState: any = null;
  userId: string;
  isAdmin: boolean;
  constructor (private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase,
               private userService: UserService ) {
    this.user = afAuth.authState;
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });

   }

  loginGoogle(): any {
    this.afAuth.auth.signInWithPopup(this.provider).then(
      (result) => {
   //     console.log('user uid is ' + result.user.uid);
        this.userService.save(result.user);
        this.userId = result.user.uid;

        this.userService.get(result.user.uid).subscribe(
          (data) => {
     //       console.log(data);
            if ((data) && (data.isAdmin)) {
              this.isAdmin = true;
              this.router.navigate(['/admin']);
              console.log('YOU ARE ADMIN');
            } else {
              this.isAdmin = false;
              this.router.navigate(['']);
            }
          }
        );

      });
  }
  // isAdmin() {
  //   this.userService.get(this.userId).subscribe(
  //     (user) =>  {
  //       if (user.isAdmin && user) return true;
  //       return false;
  //
  //     }
  //   );
  // }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserName(): string {
    return this.authState['email'];
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    return ((this.authState !== null) && (!this.isUserAnonymousLoggedIn));
  }

  signUpWithEmail(email: string, password: string ) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }


  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        return user;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/home']);
  }
}
