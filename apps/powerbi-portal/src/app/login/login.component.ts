/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'aia-web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userName = '';
  isAuthenticated = false;
  error: Error | null = null;

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {}

  async login() {
    try {
      await this.oktaAuth.signInWithRedirect({ originalUri: '/' });
    } catch (err) {
      console.error(err);
      this.error = err as Error;
    }
  }

  async logout() {
    await this.oktaAuth.signOut();
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name as string;
    }
  }
}
