import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-host-create',
  templateUrl: './create.component.html',
})
export class HostCreateComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      host: { type: 'string', title: 'Host' },
      ipAddress: { type: 'string', title: 'IP Address' },
    },
    required: ['host', 'ipAdress'],
  };
  ui: SFUISchema = {};

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {}

  save(value: any): void {
    this.http.post('/host', value).subscribe(res => {
      this.msgSrv.success('Host Added');
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
