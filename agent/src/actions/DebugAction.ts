import { Logger } from '@luca_scorpion/tinylogger';
import param, { Action, action } from './Action';

@action('', 'Debug')
export default class DebugAction implements Action {
  private readonly log = new Logger(DebugAction.name);

  public invoke(@param('value') value: string): void {
    this.log.debug(`Invoked debug action with "${value}"`);
  }
}
