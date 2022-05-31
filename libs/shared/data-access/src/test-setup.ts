/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
import 'jest-preset-angular/setup-jest';

const crypto = require('crypto');
declare var window: Window & typeof globalThis;

Object.defineProperty(window.self, 'crypto', {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
  },
});
