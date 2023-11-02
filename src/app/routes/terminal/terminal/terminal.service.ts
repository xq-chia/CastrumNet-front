import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  readonly io = io('ws://localhost:3000');

  constructor() { }

  async execute(command: string) {
    this.io.send(command);
  }
}