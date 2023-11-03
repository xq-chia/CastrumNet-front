import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  readonly io = io('ws://localhost:3000');
  outputs = new Subject<string>();

  constructor() {
    this.io.on('message', data => {
      this.outputs.next(data);
    })
  }

  async execute(command: string) {
    this.io.send(command);
  }
}