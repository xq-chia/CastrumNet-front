import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  readonly io = io('ws://localhost:3000');

  async execute(data: string) {
    this.io.send(data);
  }

  async updateBuffer(buffer: string) {
    this.io.emit('buffer', buffer)
  }
}