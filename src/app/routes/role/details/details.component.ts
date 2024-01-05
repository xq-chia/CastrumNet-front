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
  permData: STData[] = [];
  fileData: STData[] = [];
  @ViewChild('parentTbl') private readonly parentTbl!: STComponent;
  parentCol: STColumn[] = [
    { title: 'Role Id', index: 'roleId' },
    { title: 'Role', index: 'role' },
    { title: 'Description', index: 'description' },
  ];
  permCol: STColumn[] = [
    { title: 'Command', index: 'object' },
    { title: 'Rule', index: 'allow', type: 'yn' },
  ];
  fileCol: STColumn[] = [
    { title: 'Absolute Path', index: 'path' },
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

      for (const permission of res.data.permissions) {
        this.permData.push({ object: permission.object, allow: permission.allow })
      }

      for (const file of res.data.files) {
        this.fileData.push({ path: file.path })
      }
    });
  }

  close(): void {
    this.drawer.close();
  }
}
