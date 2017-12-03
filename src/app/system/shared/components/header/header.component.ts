import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected date: Date = new Date();
  protected user: User;

  constructor(
    private authServece: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onLogout() {
    console.log('logout');
    this.authServece.logout();
    this.router.navigate(['/login']);
  }
}
