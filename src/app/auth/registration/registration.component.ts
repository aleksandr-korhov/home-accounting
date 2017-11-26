import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'hm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      agree: new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {password, email, name} = this.form.value;
    const user: User = new User(email, password, name);
    this.usersService.createUser(user)
      .subscribe((data: User) => {
        this.router.navigate(['/login'], {
          queryParams: {nowCanLogin: true}
        });
      });
  }
}
