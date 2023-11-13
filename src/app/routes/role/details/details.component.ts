import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STRes } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-role-details',
  templateUrl: './details.component.html',
})
export class RoleDetailsComponent implements OnInit {
  record: any = {};
  i: any;
  url: string = '';
  res: STRes = {
    process: (_, data) => {
      let ret: any[] = [];

      for (const role of data.parentRoles) {
        ret.push({ roleId: role.roleId, role: role.role, description: role.description })
      }

      return ret;
    }
  }
  @ViewChild('parentTbl') private readonly parentTbl!: STComponent;
  parentCol: STColumn[] = [
    { title: 'Role Id', index: 'roleId' },
    { title: 'Role', index: 'role' },
    { title: 'Description', index: 'description' },
  ];

  constructor(
    private drawer: NzDrawerRef,
    private msgSrv: NzMessageService,
    private http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`/role/${this.record.roleId}`).subscribe(res => {
      this.i = res
      this.url = `/role/${this.record.roleId}`
    });
  }

  close(): void {
    this.drawer.close();
  }

  reload(): void {
    this.parentTbl.addRow({parentIds: 1})
  }
}
