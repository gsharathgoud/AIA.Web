import { Component, Inject } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'aia-web-okta-auth',
  template: '',
})
export class OktaAuthComponent {
  constructor(
    public authStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}

  async login() {
    await this.oktaAuth.signInWithRedirect({ originalUri: '/' });
  }

  async logout() {
    await this.oktaAuth.signOut();
  }
}
