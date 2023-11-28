import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
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

  save(value: any): void {
    this.http.post(`/user/${this.record.id}`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
