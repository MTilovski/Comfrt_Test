import { PlaywrightTestConfig, devices  } from '@playwright/test';
import dotenv from 'dotenv';
import Browser from 'framework/Browser';
import TestListener from 'framework/logger/TestListener'
import { Reporter } from 'playwright/types/testReporter';
import { TestmoReporterOptions } from "playwright-testmo-reporter";
dotenv.config();



/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const timeInMin: number = 60 * 1000;
 const config: PlaywrightTestConfig = {
  


  testDir: "./src/tests",
  testMatch: "**/*.spec.ts",

  // Use globalSetup & globalTearedown only if browserstack.local = true
  globalSetup: require.resolve("./src/browserstack/global-setup"),
  globalTeardown: require.resolve("./src/browserstack/global-teardown"),

  /* Maximum time one test can run for. */
  timeout: 90 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 15000,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [['junit', { 
  //   outputFile: 'results/test-results.xml',
  //   embedAnnotationsAsProperties: true,
    

  //   // Not used by Testmo
  //   // embedAttachmentsAsProperty: undefined 
  // }]],
  

  reporter: [
    ['html', { open: 'always' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: './test-results.xml' }]
  ],
  
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /*
  
    use: {
      browserName: Browser.type(process.env.BROWSER.toLowerCase()),
      headless: false,
     // channel: Browser.channel(process.env.BROWSER.toLowerCase()),
      launchOptions: {
        args: ["--start-maximized", "--disable-extensions", "--disable-plugins"],
        headless: false,
        timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10),
        slowMo: 100,
        downloadsPath: "./test-results/downloads",
      }, 
      viewport: null,
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
      actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT, 10) * timeInMin,
      navigationTimeout: Number.parseInt(process.env.NAVIGATION_TIMEOUT, 10) * timeInMin,
      screenshot: { 
        mode: "only-on-failure",
        fullPage: true,
      },
      video: "retain-on-failure",
    },
    testDir: "./src/tests",
    outputDir: "./test-results/failure",
    retries: Number.parseInt(process.env.RETRIES, 10),
    preserveOutput: "failures-only",
    reportSlowTests: null,
    timeout: Number.parseInt(process.env.TEST_TIMEOUT, 10) * timeInMin,
    workers: Number.parseInt(process.env.PARALLEL_THREAD, 10),
    reporter: [
      ['html', { open: 'never', outputFolder: 'test-results/report' }],
      ['junit', { outputFile: 'test-results/results/results.xml' }],
      ['json', { outputFile: 'test-results/results/results.json' }],
    ],
     */
  /* Configure projects for major browsers */

  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chrome@latest:Windows 11@browserstack",
      use: {
        browserName: "chromium",
        channel: "chrome",
      },

    },
    {
      name: "playwright-webkit@latest:OSX Ventura@browserstack",
      use: {
        browserName: "chromium",
        channel: "chrome",
      },
    },
    {
      name: "chrome@Samsung Galaxy S22:13@browserstack-mobile",
      use: {
        baseURL: "https://comfrt.com/?__orly_origin=qa-bento-stage",
        browserName: "chromium",
        channel: "chrome",
      },
    },

    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  outputDir: "./test-results1/",
  
 };
export default config;
