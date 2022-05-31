// const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;

export default {
  oidc: {
    clientId: `0oa4zcpgb1vG1o1mC5d7`,
    issuer: 'https://dev-67497692.okta.com/oauth2/default',
    redirectUri: '/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    testing: {
      disableHttpsCheck: true,
    },
  },
};
