import { readdirSync } from 'fs';
import * as path from 'path';
import {
  Application,
  ApplicationName,
  validateApplicationSchema,
} from './types/application';

const APPS_DIR =
  path.join(__dirname + process.env.APPS_DIR) ||
  path.join(__dirname + '/applications');

const DEFAULT_APPS_DIR = APPS_DIR + '/default';
const CUSTOM_APPS_DIR = APPS_DIR + '/custom';

/** List of known applications */
let Registry: Map<ApplicationName, Application> = new Map();

const loadAppsFromDir = (dir: string): Application[] => {
  try {
    console.log('mama', dir, __dirname);
    const candidates = readdirSync(dir);
    const apps = candidates.filter((c) => {
      console.log(c);
    });
    return [];
  } catch (err) {
    console.error('unable to load apps from dir', dir, err);
  }
  return [];
};

const parseAppDefinition = (path: string): Application | undefined => {
  delete require.cache[require.resolve(path)];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const appDefinition = require(path);
  if (appDefinition.default) {
    const validationResult = validateApplicationSchema(appDefinition.default);
    if (validationResult.success) {
      return validationResult.data as Application;
    } else {
      console.error(validationResult.error.toString());
      return undefined;
    }
  } else {
    console.error(`invalid application defintion, should have default export`);
  }
};

export const loadApplications = () => {
  Registry = new Map();
  loadAppsFromDir(DEFAULT_APPS_DIR);
  // loadAppsFromDir(CUSTOM_APPS_DIR);
};
