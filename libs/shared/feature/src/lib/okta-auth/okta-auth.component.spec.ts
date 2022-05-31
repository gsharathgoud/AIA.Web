import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuthComponent } from './okta-auth.component';

describe('OktaAuthComponent', () => {
  const oktaConfig = {
    issuer: 'https://not-real.okta.com',
    clientId: 'fake-client-id',
    redirectUri: 'http://localhost:4200',
  };
  const oktaAuth = new OktaAuth(oktaConfig);
  let component: OktaAuthComponent;
  let fixture: ComponentFixture<OktaAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OktaAuthModule],
      declarations: [OktaAuthComponent],
      providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OktaAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
