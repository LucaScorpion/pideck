import Configuration, {
  ButtonLayout,
} from '../model/configuration/Configuration';
import { ActionOption } from '../model/ActionOption';
import { AgentMeta } from '../model/AgentInfo';
import { ButtonConfig } from '../model/configuration/ButtonConfig';
import WebSocketClient from '../WebSocketClient';
import ButtonStateChanged from '../model/messages/ButtonStateChanged';
import { PressButtonResult } from '../model/messages/PressButtonResult';
import { ImageInfo } from '../model/messages/ImageInfo';

export default class Agent {
  private readonly socket: WebSocketClient;

  public constructor() {
    this.socket = new WebSocketClient('wss://wsproxy.touchdeck.app/ws/remote');
  }

  public async connect(id: string): Promise<void> {
    await this.socket.connect();
    this.socket.sendRaw(JSON.stringify({ id }));
  }

  public onDisconnect(handler: () => void): void {
    this.socket.onDisconnect(handler);
  }

  public onButtonStateChanged(
    handler: (data: ButtonStateChanged) => void
  ): void {
    this.socket.registerHandler('button-state-changed', handler);
  }

  public async getMeta(): Promise<AgentMeta> {
    return this.socket.send('get-info');
  }

  public async getConfiguration(): Promise<Configuration> {
    return this.socket.send('get-configuration');
  }

  public async setConfiguration(
    newConfig: Configuration
  ): Promise<Configuration> {
    return this.socket.send('set-configuration', newConfig);
  }

  public async upsertButton(newButton: ButtonConfig): Promise<Configuration> {
    return this.socket.send('upsert-configuration-button', newButton);
  }

  public async deleteButton(buttonId: string): Promise<Configuration> {
    return this.socket.send('delete-configuration-button', buttonId);
  }

  public async setLayout(newLayout: ButtonLayout): Promise<Configuration> {
    return this.socket.send('set-layout', newLayout);
  }

  public async pressButton(buttonId: string): Promise<PressButtonResult> {
    return this.socket.send('press-button', buttonId);
  }

  public async getActionOptions(): Promise<ActionOption[]> {
    return this.socket.send('get-action-options');
  }

  public async getImages(): Promise<ImageInfo[]> {
    return this.socket.send('get-images');
  }

  public async uploadImage(image: ImageInfo): Promise<void> {
    return this.socket.send('upload-image', image);
  }

  public async deleteImage(path: string): Promise<void> {
    return this.socket.send('delete-image', { path });
  }

  public async renameImage(oldPath: string, newPath: string): Promise<void> {
    return this.socket.send('rename-image', { oldPath, newPath });
  }
}
