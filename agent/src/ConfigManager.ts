import { Configuration } from 'touchdeck-model';
import { promises as fs } from 'fs';
import { Logger } from '@luca_scorpion/tinylogger';
import { CONFIG_FILE } from './constants';
import validateConfig from './configuration/validateConfig';
import { saveConfiguration } from './configuration/config';

export class ConfigManager {
  private static readonly log = new Logger(ConfigManager.name);

  private constructor(private configuration: Configuration) {}

  public get config(): Configuration {
    return this.configuration;
  }

  public static async load(): Promise<ConfigManager> {
    ConfigManager.log.debug('Loading configuration from disk');

    // Assert that the config file exists.
    await fs.stat(CONFIG_FILE).catch(() => fs.writeFile(CONFIG_FILE, '{}'));

    // Read, parse, and validate the config file.
    const configJson = (
      await fs.readFile(CONFIG_FILE, { encoding: 'utf-8' })
    ).toString();
    const parsed = validateConfig(JSON.parse(configJson));

    return new ConfigManager(parsed);
  }

  public async setConfiguration(newConfig: Configuration): Promise<void> {
    ConfigManager.log.debug('Updating configuration');

    this.configuration = validateConfig(newConfig);

    // TODO
    // Clear the current prepared actions, prepare the new ones.
    // if (preparedActions) {
    //   for (const action of Object.values(preparedActions)) {
    //     if (isPreparedToggleAction(action)) {
    //       action.removeChangeListener();
    //     }
    //   }
    // }
    // preparedActions = prepareActions(configuration.buttons);

    await saveConfiguration();
  }

  private async saveConfiguration(): Promise<void> {
    ConfigManager.log.debug('Writing configuration to disk');
    await fs.writeFile(
      CONFIG_FILE,
      JSON.stringify(this.configuration, null, 2)
    );
  }
}
