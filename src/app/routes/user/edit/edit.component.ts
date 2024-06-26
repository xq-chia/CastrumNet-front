import { Component, OnInit, ViewChild } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TenantService } from '../../tenant/tenant.service';
import { catchError, map, of } from 'rxjs';
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
      username: { type: 'string', title: 'Username', readOnly: true },
      password: {
        type: 'string',
        title: 'Password',
      },
      firstName: {
        type: 'string',
        title: 'First Name',
        maxLength: 50
      },
      lastName: {
        type: 'string',
        title: 'Last Name',
        maxLength: 50
      },
      tenantId: { type: 'string', title: 'Tenant' },
      status: { type: 'boolean', title: 'Status' },
    },
    required: ['username', 'firstName', 'lastName', 'tenantId']
  };
  ui: SFUISchema = {
    $userId: {
      hidden: true
    },
    $tenantId: {
      widget: 'select',
      asyncData: () => this.fetchAllTenants().pipe(
        map((res: any) => res.data),
        map(tenants => tenants.map((tenant: any) => ({ label: `${tenant.role}`, value: tenant.tenantId })))
      )
    },
    $status: {
      checkedChildren: 'Active',
      unCheckedChildren: 'Frozen'
    },
    $password: {
      type: 'password',
      hidden: true
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private tenantService: TenantService,
  ) {}

  ngOnInit(): void {
    if (this.record.userId > 0) {
      this.http.get(`/users/${this.record.userId}`).subscribe(res => {
        res.userId = res.data.user.userId;
        res.firstName = res.data.user.firstName;
        res.lastName = res.data.user.lastName;
        res.username = res.data.user.username;
        res.password = res.data.user.password;
        res.status = res.data.user.status;
        res.tenantId = res.data.tenant.tenantId;

        this.i = res;
      });
    }
  }

  edit(value: any): void {
    this.http.patch(`/users/${this.record.userId}`, value).pipe(
      catchError(err => {
        this.msgSrv.error(err.error.msg)
        return of(null);
      })
    ).subscribe(res => {
      if (res == null) {
        this.modal.close(true)
        return ;
      }
      this.msgSrv.success(res.data.msg)
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
