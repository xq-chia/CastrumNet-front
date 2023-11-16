import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-host-host',
  templateUrl: './host.component.html',
})
export class HostHostComponent implements OnInit {
  hosts: any[] = []

  constructor(private http: _HttpClient) { }

  ngOnInit(): void {
    this.http.get('/host').subscribe(res => {
      this.hosts = res
    })
  }
}
