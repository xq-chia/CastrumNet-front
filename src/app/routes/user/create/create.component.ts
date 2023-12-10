import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { HostService } from '../../host/host.service';
import { map } from 'rxjs';
import { TenantService } from '../../tenant/tenant.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
})
export class UserCreateComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      username: { type: 'string', title: 'Username' },
      password: { type: 'string', title: 'Password' },
      firstName: { type: 'string', title: 'First Name' },
      lastName: { type: 'string', title: 'Last Name' },
      tenantId: { type: 'string', title: 'Tenant' },
      hostIds: { type: 'string', title: 'Host' }
    },
    required: ['userId', 'username', 'password', 'firstName', 'lastName', 'tenantId'],
  };
  ui: SFUISchema = {
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
        map(res => res.data),
        map((hosts: any[]) => hosts.map((host: any) => ({ label: `${host.host} | ${host.ipAddress}`, value: host.hostId })))
      )
    },
    $password: {
      type: 'password'
    }
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
    this.http.post('/users', value).subscribe(res => {
      this.msgSrv.success('User Created');
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
