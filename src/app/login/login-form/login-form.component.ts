import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  // @ts-ignore
  LoginForm: FormGroup

  constructor(private fb: FormBuilder,
              private auth: AngularFireAuth,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })}

  onLogin() {
    const {email, password} = this.LoginForm.value
    this.auth.signInWithEmailAndPassword(email, password).then(() => this.router.navigate(['']))
  }

}
