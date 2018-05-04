import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  form: FormGroup;
  authState: any = null;

  public isLoggedIn: boolean;
  public user_displayName: string;
  public sign_in: string;

  constructor(public af: AngularFireAuth, private fm: FormBuilder, public authService: AuthService,
              private fb: FormBuilder, private router: Router) {
    this.form = this.fm.group({
      'email' : ['', [Validators.required, Validators.email]],
      'password':  ['', [Validators.required, Validators.minLength(5)]]
    });
    this.af.auth.onAuthStateChanged((user) => {
        if (user != null) {
          this.isLoggedIn = true;
          this.user_displayName = user.displayName;
          this.sign_in = 'Sign Out';

        } else {
          this.isLoggedIn = false;
          this.sign_in = 'Sign In';
        }
      }
    );
  }

  ngOnInit() {
  }

  login(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error)
        throw error;
      });
  }
  checkAndSignin() {
    if (this.isLoggedIn === false) {
      this.authService.loginGoogle();
    } else {
      this.logout();
    }
  }
  logout() {
    this.authService.signOut();
  }

  signin() {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    this.authService.loginWithEmail(this.form.controls.email.value, this.form.controls.password.value)
      .then(() => this.router.navigate(['/home']));
  }
}
