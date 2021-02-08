import { promises as fs } from 'fs';
import { Logger } from '@luca_scorpion/tinylogger';
import { Configuration } from 'touchdeck-model';
import { CONFIG_DIR, CONFIG_FILE, IMAGES_DIR } from '../constants';
import { PreparedActions } from '../actions/prepareActions';

const log = new Logger('configuration');

// Cached configuration data.
let configuration: Configuration;
// Prepared actions by button id.
let preparedActions: PreparedActions;

export async function readConfiguration(): Promise<Configuration> {
  log.debug('Reading configuration from disk');

  // Check if the config directory and file exist.
  await fs.stat(CONFIG_DIR).catch(() => fs.mkdir(CONFIG_DIR));
  await fs.stat(CONFIG_FILE).catch(() => fs.writeFile(CONFIG_FILE, '{}'));
  await fs.stat(IMAGES_DIR).catch(() => fs.mkdir(IMAGES_DIR));

  // Read the config file.
  const configJson = (
    await fs.readFile(CONFIG_FILE, { encoding: 'utf-8' })
  ).toString();
  return JSON.parse(configJson);
}

export async function saveConfiguration(): Promise<void> {
  log.debug('Writing configuration to disk');
  await fs.writeFile(CONFIG_FILE, JSON.stringify(configuration, null, 2));
}

export function getPreparedActions(): PreparedActions {
  return preparedActions;
}
