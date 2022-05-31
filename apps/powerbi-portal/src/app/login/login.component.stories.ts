import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { LoginComponent } from './login.component';

const oktaConfig = {
  issuer: 'https://not-real.okta.com',
  clientId: 'fake-client-id',
  redirectUri: 'http://localhost:4200',
};
const oktaAuth = new OktaAuth(oktaConfig);

export default {
  title: 'LoginComponent',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [OktaAuthModule],
      providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
    }),
  ],
} as Meta<LoginComponent>;

const Template: Story<LoginComponent> = (args: LoginComponent) => ({
  component: LoginComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
