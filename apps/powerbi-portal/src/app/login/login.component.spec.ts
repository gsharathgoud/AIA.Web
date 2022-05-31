import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  const oktaConfig = {
    issuer: 'https://not-real.okta.com',
    clientId: 'fake-client-id',
    redirectUri: 'http://localhost:4200',
  };
  const oktaAuth = new OktaAuth(oktaConfig);

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OktaAuthModule],
      declarations: [LoginComponent],
      providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
