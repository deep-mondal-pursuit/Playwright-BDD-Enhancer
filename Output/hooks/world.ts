import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from '@playwright/test';

/** Shape every step uses. Both runners provide an object with this shape. */
export interface TestWorld {
  page: Page;
  context: BrowserContext;
}

export class CustomWorld extends World implements TestWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
