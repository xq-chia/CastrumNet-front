import { Injectable } from '@angular/core';
import { TokenService } from '@delon/auth';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  io: Socket = io('ws://localhost:3000');

  async init(userHostId: number) {
    this.io.emit('init', userHostId)
  }

  async execute(data: string) {
    this.io.send(data);
  }

  async updateBuffer(buffer: string) {
    this.io.emit('buffer', buffer)
  }
}