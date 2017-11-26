import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'hm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message = null;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
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
