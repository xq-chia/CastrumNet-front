import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
})
export class UserCreateComponent implements OnInit {
  record: any = {};
  i: any;
  // schema: SFSchema = {
  //   properties: {
  //     no: { type: 'string', title: '编号' },
  //     owner: { type: 'string', title: '姓名', maxLength: 15 },
  //     callNo: { type: 'number', title: '调用次数' },
  //     href: { type: 'string', title: '链接', format: 'uri' },
  //     description: { type: 'string', title: '描述', maxLength: 140 },
  //   },
  //   required: ['owner', 'callNo', 'href', 'description'],
  // };
  // ui: SFUISchema = {
  //   '*': {
  //     spanLabelFixed: 100,
  //     grid: { span: 12 },
  //   },
  //   $no: {
  //     widget: 'text'
  //   },
  //   $href: {
  //     widget: 'string',
  //   },
  //   $description: {
  //     widget: 'textarea',
  //     grid: { span: 24 },
  //   },
  // };
  schema: SFSchema = {
    properties: {
      userId: { type: 'number', title: 'User Id' },
      username: { type: 'string', title: 'Username' },
      password: { type: 'string', title: 'Password' },
      firstName: { type: 'string', title: 'First Name' },
      lastName: { type: 'string', title: 'Last Name' },
      tenantId: { type: 'number', title: 'Tenant' },
    },
    required: ['userId', 'username', 'password', 'firstName', 'lastName', 'tenantId'],
  };
  ui: SFUISchema = {};

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {}

  save(value: any): void {
    console.log(value)
    this.http.post('/users', value).subscribe(res => {
      this.msgSrv.success('User Created');
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
