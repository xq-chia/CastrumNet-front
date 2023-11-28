import { Component, OnInit } from '@angular/core';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { HostCreateComponent } from '../create/create.component';
import { HostEditComponent } from '../edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-host-list',
  templateUrl: './list.component.html',
})
export class HostListComponent implements OnInit {
  hosts: any[] = []

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService
  ) { }

  ngOnInit(): void {
    this.http.get('/host').subscribe(res => {
      this.hosts = res
    })
  }

  add(): void {
    this.modal.createStatic(HostCreateComponent).subscribe(res => {
      this.msgSrv.success('Host Created');
      this.ngOnInit();
    });
  }
  
  edit(hostId: number): void {
    this.modal.createStatic( HostEditComponent, { record: { hostId: hostId } }).subscribe(res => {
      this.msgSrv.success('Host Edited');
      this.ngOnInit();
    })
  }

  delete(hostId: number): void {

  }
}
