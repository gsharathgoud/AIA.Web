import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { environment } from '../environments/environment';
import { PowerBIEmbedComponent } from './powerbi-embed/powerbi-embed.component';
import { PowerBIReportEmbedComponent } from './powerbi-report-embed/powerbi-report-embed.component';
import { PowerBIVisualEmbedComponent } from './powerbi-visual-embed/powerbi-visual-embed.component';
import { OktaAuthComponent } from './okta-auth/okta-auth.component';
import config from './shared-feature.config';

const oktaAuth = new OktaAuth(config.oidc);
@NgModule({
  declarations: [
    PowerBIEmbedComponent,
    PowerBIReportEmbedComponent,
    PowerBIVisualEmbedComponent,
    OktaAuthComponent,
  ],
  imports: [CommonModule, OktaAuthModule],
  exports: [PowerBIEmbedComponent, PowerBIReportEmbedComponent, PowerBIVisualEmbedComponent],
  providers: [
    {
      provide: OKTA_CONFIG,
      useFactory: () => {
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth) => {
            const triggerLogin = async () => {
              await oktaAuth.signInWithRedirect();
            };
            if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
              triggerLogin();
            } else {
              if (window.confirm('Do you want to re-authenticate?')) {
                triggerLogin();
              } else {
                window.console.log('denied');
              }
            }
          },
        };
      },
      useValue: { oktaAuth },
    },
    { provide: APP_BASE_HREF, useValue: environment.appBaseHref },
  ],
})
export class SharedFeatureModule {}
