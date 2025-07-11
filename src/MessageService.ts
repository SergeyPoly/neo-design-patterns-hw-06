import { withTimestamp, uppercase } from './decorators';
import { IMessageService } from './IMessageService';

export class MessageService implements IMessageService {
  @withTimestamp
  @uppercase
  send(message: string): void {
    console.log(message);
  }
}
