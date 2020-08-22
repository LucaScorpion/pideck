import OBSWebSocket from 'obs-websocket-js';
import Logger from '../../Logger';

export interface VersionResult {
  'obs-websocket-version': string;
  'obs-studio-version': string;
}

export const obsSocketMetadataKey = Symbol('ObsSocket');

export function obsSocket(
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string | symbol,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parameterIndex: number
): void {
  Reflect.defineMetadata(obsSocketMetadataKey, true, target, propertyKey);
}

export default class ObsSocket {
  private readonly log = new Logger(ObsSocket.name);

  private readonly obs: OBSWebSocket;

  public constructor() {
    this.obs = new OBSWebSocket();

    // TODO: Auto-connect, handle disconnect/reconnect.
  }

  public async connect(): Promise<void> {
    await this.obs.connect();
    const version = await this.getVersion();
    this.log.debug(
      `Connected to OBS version ${version['obs-studio-version']}, websocket plugin version ${version['obs-websocket-version']}`
    );
  }

  public async getVersion(): Promise<VersionResult> {
    return this.obs.send('GetVersion');
  }

  public async setScene(scene: string): Promise<void> {
    return this.obs.send('SetCurrentScene', { 'scene-name': scene });
  }

  public async getSceneNames(): Promise<string[]> {
    const response = await this.obs.send('GetSceneList');
    return response.scenes.map((scene) => scene.name);
  }

  public async setMute(source: string, mute: boolean): Promise<void> {
    return this.obs.send('SetMute', { source, mute });
  }
}