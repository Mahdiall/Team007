import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  form: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {

    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    console.log("user id is: "+this.authService.userId);
  }
  logout(){
    this.authService.signOut();
  }

  // loginByGo() {
  //   this.authService.loginWithGo();
  // }

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
  loginByGo() {
    this.authService.loginGoogle();
  }

}
