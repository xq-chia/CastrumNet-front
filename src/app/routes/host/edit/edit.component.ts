import { Component, OnInit, ViewChild } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-host-edit',
  templateUrl: './edit.component.html',
})
export class HostEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      host: { type: 'string', title: 'Host' },
      ipAddress: { type: 'string', title: 'IP Address' },
    },
    required: ['host', 'ipAddress'],
  };
  ui: SFUISchema = { };
  isUp: boolean = false;
  @ViewChild('testConnBtn') private testConnBtn!: NzButtonComponent;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get(`/host/${this.record.hostId}`). subscribe(res => {
      this.i = res;
    });
  }

  edit(value: any): void {
    this.http.patch(`/host/${this.record.hostId}`, value).subscribe(res => {
      this.modal.close(true);
    });
  }

  testConn(value: any) {
    this.testConnBtn.nzLoading = true;
    this.http.post('/host/testConn', { ipAddress: value.ipAddress }).subscribe(res => {
      this.testConnBtn.nzLoading = false;
      this.isUp = res;
      if (!res) {
        this.msgSrv.error(`SSH Connection to ${value.ipAddress} failed. Please try again.`)
      } else {
        this.msgSrv.success(`SSH Connection Success`)
      }
    })
  }

  close(): void {
    this.modal.destroy();
  }
}
