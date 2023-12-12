import { Component, OnInit } from '@angular/core';
import { ERRORSDEFAULT, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { HostService } from '../../host/host.service';
import { catchError, map, of } from 'rxjs';

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
      asyncData: () => this.fetchAllHosts().pipe(
        map(res => res.data.hosts),
        map((hosts: any[]) => hosts.map((host: any) => ({ label: `${host.host} | ${host.ipAddress}`, value: host.hostId })))
      )
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
      this.http.get(`/hostAssignment/${this.record.userId}`).pipe(
        catchError(err => {
          this.msgSrv.error(err);
          return of(null);
        })
      ).subscribe(res => {
        if (res == null) {
          return ;
        }
        res.data.hostIds = res.data.userHosts.map((userHost: any) => userHost.hostId);

        this.i = res.data;
      });
    }
  }

  save(value: any): void {
    this.http.patch(`/hostAssignment/${this.record.userId}`, value).pipe(
      catchError(err => {
        this.msgSrv.error(err.error.msg);
        return of(null)
      })
    ).subscribe(res => {
      if (res == null) {
        this.modal.close(true);
        return ;
      }
      this.msgSrv.success(res.data.msg);
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }

  fetchAllHosts() {
    return this.hostService.fetchAllHosts();
  }
}
