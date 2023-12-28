import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { HostService } from '../../host/host.service';
import { catchError, map, of } from 'rxjs';
import { TenantService } from '../../tenant/tenant.service';
import { MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
})
export class UserCreateComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      username: {
        type: 'string',
        title: 'Username',
        format: 'email', 
        maxLength: 254
      },
      password: {
        type: 'string',
        title: 'Password',
        minLength: 8,
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
      hostIds: { type: 'string', title: 'Host' }
    },
    required: ['username', 'password', 'firstName', 'lastName', 'tenantId'],
  };
  ui: SFUISchema = {
    $username: {
      validator: (value: any) => this.http.get(`/users/check/${value}`).pipe(
        map(res => res.data ? [{ keyword: 'pattern', message: 'Username has been taken' }] : [])
      )
    },
    $password: {
      type: 'password',
      errors: { 'minLength': 'Password should not be shorter than 8 characters' }
    },
    $tenantId: {
      widget: 'select',
      asyncData: () => this.fetchAllTenants().pipe(
        map((res: any) => res.data),
        map(tenants => tenants.map((tenant: any) => ({ label: `${tenant.role}`, value: tenant.tenantId })))
      )
    },
    $hostIds: {
      widget: 'select',
      mode: 'multiple',
      asyncData: () => this.fetchAllHosts().pipe(
        map(res => res.data.hosts),
        map((hosts: any[]) => hosts.map((host: any) => ({ label: `${host.host} | ${host.ipAddress}`, value: host.hostId })))
      )
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private hostService: HostService,
    private tenantService: TenantService
  ) {}

  ngOnInit(): void {}

  fetchAllHosts() {
    return this.hostService.fetchAllHosts();
  }

  fetchAllTenants() {
    return this.tenantService.fetchAllTenants();
  }

  save(value: any): void {
    this.http.post('/users', value).pipe(
      catchError(err => {
        this.msgSrv.error(err.error.msg)
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
