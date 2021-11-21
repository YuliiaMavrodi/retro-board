import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  registerForm: FormGroup
  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  createUser() {
    const {email, password} = this.registerForm.value
    this.auth.createUserWithEmailAndPassword(email, password). then((user => {
      console.log('User', user)
      this.router.navigate([''])
    }))
  }

}
