import { Component, OnInit } from '@angular/core';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { HostCreateComponent } from '../create/create.component';

@Component({
  selector: 'app-host-list',
  templateUrl: './list.component.html',
})
export class HostListComponent implements OnInit {
  hosts: any[] = []

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper
  ) { }

  ngOnInit(): void {
    this.http.get('/host').subscribe(res => {
      this.hosts = res
    })
  }

  add(): void {
    this.modal.createStatic(HostCreateComponent).subscribe(res => {
      this.ngOnInit();
    });
  }
  
  edit(): void {

  }
}
