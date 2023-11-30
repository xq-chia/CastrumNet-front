import { Component, OnInit, ViewChild } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TenantService } from '../../tenant/tenant.service';
import { map } from 'rxjs';
import { HostService } from '../../host/host.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html'
})
export class UserEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      userId: { type: 'number', title: 'User Id', readOnly: true },
      username: { type: 'string', title: 'Username' },
      password: { type: 'string', title: 'Password' },
      firstName: { type: 'string', title: 'First Name' },
      lastName: { type: 'string', title: 'Last Name' },
      tenantId: { type: 'string', title: 'Tenant' },
      status: { type: 'boolean', title: 'Status' },
    },
    required: ['userId', 'username', 'password', 'firstName', 'lastName', 'tenantId']
  };
  ui: SFUISchema = {
    $tenantId: {
      widget: 'select',
      asyncData: () => this.fetchAllTenants().pipe(map(tenants => tenants.map(tenant => ({ label: `${tenant.role}`, value: tenant.tenantId }))))
    },
    $status: {
      checkedChildren: 'Active',
      unCheckedChildren: 'Frozen'
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private tenantService: TenantService,
    private hostService: HostService,
  ) {}

  ngOnInit(): void {
    if (this.record.userId > 0) {
      this.http.get(`/users/${this.record.userId}`).subscribe(res => {
        res.userId = res.user.userId;
        res.firstName = res.user.firstName;
        res.lastName = res.user.lastName;
        res.username = res.user.username;
        res.password = res.user.password;
        res.status = res.user.status;
        res.tenantId = res.tenant.tenantId;

        this.i = res;
      });
    }
  }

  edit(value: any): void {
    this.http.patch(`/users/${this.record.userId}`, value).subscribe(res => {
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }

  fetchAllTenants() {
    return this.tenantService.fetchAllTenants();
  }
}
