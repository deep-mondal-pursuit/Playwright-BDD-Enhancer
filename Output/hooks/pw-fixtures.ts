import { test as base, createBdd } from 'playwright-bdd';
import type { TestWorld } from './world';

export const test = base.extend<{ world: TestWorld }>({
  world: async ({ page, context }, use) => {
    await use({ page, context });
  },
});

const { Given, When, Then } = createBdd(test, { worldFixture: 'world' });
export const steps = { Given, When, Then };
