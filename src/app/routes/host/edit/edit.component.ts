import { Component, OnInit, ViewChild } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { catchError, of } from 'rxjs';

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
  @ViewChild('testConnBtn') private testConnBtn!: NzButtonComponent;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get(`/host/${this.record.hostId}`).pipe(
      catchError(err => {
        this.msgSrv.error(err.errror.msg);
        return of(null);
      })
    ).subscribe(res => {
      if (res == null) {
        return ;
      }
      this.i = res.data.host;
    });
  }

  edit(value: any): void {
    this.http.patch(`/host/${this.record.hostId}`, value).pipe(
      catchError(err => {
        this.msgSrv.error(err.error.msg);
        return of(null);
      })
    ).subscribe(res => {
      if (res == null) {
        this.modal.close(true);
        return ;
      }
      this.msgSrv.success(res.data.msg);
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
