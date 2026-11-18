import { Page, Browser } from '@playwright/test';

declare global {
  namespace NodeJS {
    interface Global {
      page: Page;
      browser: Browser;
    }
  }
  var page: Page;
  var browser: Browser;
}

export {};