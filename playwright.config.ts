import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './tests/utils/environmentBaseUrl';

require('dotenv').config();

export default defineConfig({
  // globalSetup: require.resolve('./tests/setup/global-setup'), // 1. delete
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  // timeout: 5000,
  use: {
    // storageState: 'storageState.json', // 2. delete because they cannot be used simultaneously. other tests will not run
    trace: 'on',
    baseURL: process.env.ENV === 'production' 
      ? baseEnvUrl.production.home
      : process.env.ENV === 'staging' 
        ? baseEnvUrl.staging.home
        : baseEnvUrl.local.home
  },

  projects: [
    { 
      name: 'auth-setup', 
      testMatch: /auth-setup\.ts/ //3. project that will bind the auth-setup file
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
       },
    },
    {
      name: 'chromium-auth',
      use: { 
        ...devices['Desktop Chrome'] ,
        // storageState: '.auth/admin.json', //use this in case you have multiple projects one per user
      },
      dependencies: ['auth-setup'], // 4. add dependencies of auth-setup
    },
  ],
});
