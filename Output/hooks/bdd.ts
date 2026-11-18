import type * as Cucumber from '@cucumber/cucumber';

type StepApi = Pick<typeof Cucumber, 'Given' | 'When' | 'Then'>;

/** Returns Given/When/Then for the active runner (set by playwright.config.ts). */
function loadStepApi(): StepApi {
  if (process.env.BDD_RUNNER === 'playwright') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('./pw-fixtures').steps as StepApi;
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('@cucumber/cucumber') as StepApi;
}

export const { Given, When, Then } = loadStepApi();
