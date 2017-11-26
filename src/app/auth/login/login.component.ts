import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'hm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message = null;

  constructor(
    private auth: AuthService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage('Теперь вы можете зайти в систему.', 'success');
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getByEmail(formData.email).subscribe((user: User) => {
      if (user) {
        if (user.password === formData.password) {
          this.showMessage('welcome', 'success');
          // this.message = null;
          localStorage.setItem('user', JSON.stringify(user));
          this.auth.login();
          // this.router.navigate(['']);
        } else {
          this.showMessage('Пароль не верный', 'danger');
        }
      } else {
        this.showMessage('Пользователь не найден', 'danger');
      }
    });
  }

  showMessage(text, type = 'info') {
    this.message = new Message(type, text);

    setTimeout(() => this.message = null, 2000);
  }
}
