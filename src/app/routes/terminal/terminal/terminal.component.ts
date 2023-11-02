import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FunctionsUsingCSI, NgTerminal } from 'ng-terminal';
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
    private http: _HttpClient,
    private socket: TerminalService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.term.write('$ ')

    this.term.onData().subscribe(input => {
      switch (input) {
        // Enter (CR)
        case '\r':
          if (this.command.length) {
            this.runCommand(this.command);
          }
          this.nextLine();

          this.command = '';
          break;
        // Ctrl+C
        case '\u0003':
          this.term.write('^C');
          this.nextLine();
          
          this.command = '';
          break;
        // Backspace (DEL)
        case '\u007F':
          if (this.command) {
            this.term.write('\b \b');

            this.command = this.command.slice(0, -1);
          }
          break;
        default:
          if (input >= String.fromCharCode(0x20) && input <= String.fromCharCode(0x7E) || input >= '\u00a0') {
            this.command += input;
            this.term.write(input);
          }
      }
    });
  }

  private nextLine(): void {
    this.term.write(this.prompt);
  }
  
  private runCommand(command: string): void {
    this.socket.execute(command);
  }
}
