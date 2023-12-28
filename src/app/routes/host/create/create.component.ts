import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-host-create',
  templateUrl: './create.component.html',
})
export class HostCreateComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      host: {
        type: 'string',
        title: 'Host',
        maxLength: 50
      },
      ipAddress: { type: 'string', title: 'IP Address', format: 'ipv4' },
    },
    required: ['host', 'ipAddress'],
  };
  ui: SFUISchema = {
    $ipAddress: {
      validator: (value: any) => this.http.get(`/host/check/${value}`).pipe(
        map(res => res.data ? [{ keyword: 'pattern', message: 'Host is already in the asset pool' }] : [])
      ),
      errors: { format: 'Invalid IPv4 address' }
    }
  };
  @ViewChild('testConnBtn') private testConnBtn!: NzButtonComponent;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {}

  save(value: any): void {
    this.http.post('/host', value).pipe(
      catchError(err => {
        this.msgSrv.error(err.error.msg);
        return of(null);
      })
    ).subscribe(res => {
      if (res == null) {
        this.modal.close(true);
        return ;
      }
      this.msgSrv.success(res.data.msg)
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
