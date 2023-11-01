import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  readonly socket = new WebSocket('ws://localhost:3000');

  constructor() {
    this.socket.addEventListener('open', (event) => {
      console.log('Connected to WebSocket Server');
      this.socket.send('Hello Server!');
    })

    this.socket.addEventListener('message', (event) => {
      console.log('Message from server:', event.data)
    })
  }

  execute(command: string) {
    return;
    this.socket.send(command);
  }
}