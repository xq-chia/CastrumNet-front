import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-role-create',
  templateUrl: './create.component.html',
})
export class RoleCreateComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      roleId: { type: 'number', title: 'Role Id' },
      role: { type: 'string', title: 'Role' },
      description: { type: 'string', title: 'Description' },
    },
    required: ['roleId', 'role', 'description'],
  };
  ui: SFUISchema = {};

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {}

  save(value: any): void {
    this.http.post(`/role`, value).subscribe(res => {
      this.msgSrv.success('Role Created');
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
