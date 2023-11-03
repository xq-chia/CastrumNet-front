import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgTerminal } from 'ng-terminal';
import { TerminalService } from './terminal.service';

@Component({
  selector: 'app-terminal-terminal',
  templateUrl: './terminal.component.html'
})
export class TerminalTerminalComponent implements OnInit, AfterViewInit {
  @ViewChild('term', { static: false }) term!: NgTerminal;
  readonly prompt: string = '\r\n' + '$ ';
  command: string = '';

  constructor(
    private socket: TerminalService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Ctrl+L 
    // redraw to display prompt
    this.socket.execute('\u000c')

    this.term.onData().subscribe(data => {
      this.socket.execute(data);
    })

    this.socket.outputs.subscribe((data) => {
      this.term.write(data);
    })
  }
}
