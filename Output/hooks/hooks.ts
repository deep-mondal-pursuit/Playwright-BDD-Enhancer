import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit, type Browser } from '@playwright/test';
import { CustomWorld } from './world';
import { env } from '../src/config/env';

setDefaultTimeout(env.timeout);

let browser: Browser;

BeforeAll(async function () {
  const browserType = { chromium, firefox, webkit }[env.browser];
  browser = await browserType.launch({ headless: env.headless });
});

Before(async function (this: CustomWorld) {
  this.browser = browser;
  this.context = await browser.newContext({ baseURL: env.baseUrl });
  this.context.setDefaultTimeout(env.timeout);
  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, { pickle, result }) {
  if (result?.status === Status.FAILED && this.page) {
    this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
    const name = pickle.name.replace(/\W+/g, '_');
    await this.context.tracing.stop({ path: `reports/traces/${name}.zip` });
  } else {
    await this.context?.tracing.stop();
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
