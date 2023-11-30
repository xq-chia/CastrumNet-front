import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STData, STRes } from '@delon/abc/st';
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
  tblData: STData[] = [];
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

      this.i = res.data
      
      for (const role of res.data.parentRoles) {
        this.tblData.push({ roleId: role.roleId, role: role.role, description: role.description });
      }
    });
  }

  close(): void {
    this.drawer.close();
  }
}
