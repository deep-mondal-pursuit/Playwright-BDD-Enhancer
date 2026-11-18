import dotenv from 'dotenv';
import path from 'path';

// Load .env without overriding variables already set (e.g. by CI).
dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: false, quiet: true });

export type BrowserName = 'chromium' | 'firefox' | 'webkit';
export type Role = 'user';

export interface UserCredentials {
  username: string;
  password: string;
}

const REQUIRED_KEYS = ['BASE_URL'] as const;
const BROWSERS: BrowserName[] = ['chromium', 'firefox', 'webkit'];

function validate(): void {
  const missing = REQUIRED_KEYS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}. ` +
        'Copy .env.example to .env and fill in the values.',
    );
  }
  const browser = process.env.BROWSER ?? 'chromium';
  if (!BROWSERS.includes(browser as BrowserName)) {
    throw new Error(`BROWSER must be one of: ${BROWSERS.join(', ')}.`);
  }
  const timeout = Number(process.env.TIMEOUT ?? 30000);
  if (!Number.isFinite(timeout) || timeout <= 0) {
    throw new Error('TIMEOUT must be a positive number of milliseconds.');
  }
}

validate();

export const env = {
  baseUrl: process.env.BASE_URL as string,
  browser: (process.env.BROWSER ?? 'chromium') as BrowserName,
  headless: process.env.HEADLESS !== 'false',
  timeout: Number(process.env.TIMEOUT ?? 30000),
};

/**
 * Returns credentials for a role. Credentials are validated lazily so that
 * dry runs, bddgen and test listing work without secrets.
 */
export function getUser(role: Role): UserCredentials {
  const prefix = role.toUpperCase();
  const usernameKey = `${prefix}_USERNAME`;
  const passwordKey = `${prefix}_PASSWORD`;
  const missing = [usernameKey, passwordKey].filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing credentials for role "${role}": ${missing.join(', ')}. Set them in .env.`,
    );
  }
  return {
    username: process.env[usernameKey] as string,
    password: process.env[passwordKey] as string,
  };
}
