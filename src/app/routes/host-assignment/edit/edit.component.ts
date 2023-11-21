import { Component, OnInit } from '@angular/core';
import { ERRORSDEFAULT, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { HostService } from '../../host/host.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-host-assignment-edit',
  templateUrl: './edit.component.html'
})
export class HostAssignmentEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      hostIds: { type: 'string', title: 'Host' }
    }
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

  ngOnInit(): void {
    if (this.record.userId > 0) {
      this.http.get(`/hostAssignment/${this.record.userId}`).subscribe(res => {
        res.hostIds = res.userHosts.map((userHost: any) => userHost.hostId);

        this.i = res;
      });
    }
  }

  save(value: any): void {
    this.http.patch(`/hostAssignment/${this.record.userId}`, value).subscribe(res => {
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }

  fetchAllHosts() {
    return this.hostService.fetchAllHosts();
  }

  convertHostToSchema(host: any) {
    return { label: `${host.host} | ${host.ipAddress}`, value: host.hostId };
  }
}
