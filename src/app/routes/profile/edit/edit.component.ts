import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { SFComponent, SFSchema, SFUISchema, SFValue, SFValueChange } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { catchError, map, of } from 'rxjs';
import { TenantService } from '../../tenant/tenant.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './edit.component.html',
})
export class ProfileEditComponent implements OnInit {
  record: any = {};
  i: any;
  @ViewChild('sf') private readonly sf!: SFComponent;
  schema: SFSchema = {
    properties: {
      userId: { type: 'number', title: 'User Id', readOnly: true },
      username: { type: 'string', title: 'Username', readOnly: true },
      password: {
        type: 'string',
        title: 'Password',
        minLength: 8
      },
      confirmPassword: { type: 'string', title: 'Confirm Password' },
      firstName: { type: 'string', title: 'First Name' },
      lastName: { type: 'string', title: 'Last Name' },
      tenantId: { type: 'string', title: 'Tenant', readOnly: true },
      status: { type: 'boolean', title: 'Status', readOnly: true },
    },
    required: ['firstName', 'lastName', 'password', 'confirmPassword']
  };
  ui: SFUISchema = {
    $userId: {
      hidden: true
    },
    // TODO: password mismatch
    $password: {
      type: 'password'
    },
    $tenantId: {
      widget: 'select',
      asyncData: () => this.fetchAllTenants().pipe(
        map((res: any) => res.data),
        map(tenants => tenants.map((tenant: any) => ({ label: `${tenant.role}`, value: tenant.tenantId })))
      )
    },
    $confirmPassword: {
      type: 'password',
      validator: (value: any) => {
        if (this.sf?.getValue('/password') == value) {
          return []
        } else {
          return [{ keyword: 'error', message: 'Password and Confirm Password Mismatch' }]
        }
      }
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private tenantService: TenantService
  ) {}

  ngOnInit(): void {
    if (this.record.userId > 0) {
      this.http.get(`/users/${this.record.userId}`).subscribe(res => {
        res.userId = res.data.user.userId;
        res.firstName = res.data.user.firstName;
        res.lastName = res.data.user.lastName;
        res.username = res.data.user.username;
        res.password = '';
        res.status = res.data.user.status;
        res.tenantId = res.data.tenant.tenantId;

        this.i = res;
      });
    }
  }

  fetchAllTenants() {
    return this.tenantService.fetchAllTenants();
  }

  save(value: any): void {
    this.http.patch(`/users/${this.record.userId}`, value).pipe(
      catchError(err => {
        this.msgSrv.error("Profile Update Failed")
        return of(null);
      })
    ).subscribe(res => {
      if (res == null) {
        this.modal.close(false)
        return ;
      }
      this.msgSrv.success("Profile Updated")
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
