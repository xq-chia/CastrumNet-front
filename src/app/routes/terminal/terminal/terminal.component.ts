import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FunctionsUsingCSI, NgTerminal } from 'ng-terminal';
import { TerminalService } from './terminal.service';

@Component({
  selector: 'app-terminal-terminal',
  templateUrl: './terminal.component.html'
})
export class TerminalTerminalComponent implements OnInit, AfterViewInit {
  @ViewChild('term', { static: false }) child!: NgTerminal;
  readonly prompt: string = '\n' + FunctionsUsingCSI.cursorColumn(1) + '$ ';

  constructor(
    private http: _HttpClient,
    private socket: TerminalService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.child.write('$ ');
    this.socket.execute('test')

    this.child.onData().subscribe(input => {
      switch (input) {
        case '\r':
          this.nextLine();
      }
    });
  }

  private nextLine(): void {
    this.child.write(this.prompt);
  }
}
