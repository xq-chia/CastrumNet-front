import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { HostService } from '../../host/host.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
})
export class UserCreateComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      userId: { type: 'number', title: 'User Id' },
      username: { type: 'string', title: 'Username' },
      password: { type: 'string', title: 'Password' },
      firstName: { type: 'string', title: 'First Name' },
      lastName: { type: 'string', title: 'Last Name' },
      tenantId: { type: 'number', title: 'Tenant' },
      hostIds: { type: 'string', title: 'Host' }
    },
    required: ['userId', 'username', 'password', 'firstName', 'lastName', 'tenantId'],
  };
  ui: SFUISchema = {
    $hostIds: {
      widget: 'select',
      mode: 'multiple',
      asyncData: () => this.fetchAllHosts().pipe(map(hosts => hosts.map(host => this.convertHostToSchema(host))))
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private hostService: HostService
  ) {}

  ngOnInit(): void {}

  fetchAllHosts() {
    return this.hostService.fetchAllHosts();
  }

  convertHostToSchema(host: any) {
    return { label: `${host.host} | ${host.ipAddress}`, value: host.hostId };
  }

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
