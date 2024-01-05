import { Component, Inject, OnInit } from '@angular/core';
import { STColumn, STRes } from '@delon/abc/st';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-details',
  templateUrl: './details.component.html',
})
export class UserDetailsComponent implements OnInit {
  userId: number = this.tokenSrv.get()!['id'];
  record: any = {};
  i: any;
  hostUrl = `/roleAssignment/${this.userId}`;
  hostRes: STRes ={
    process: (_, res) => {
      return res.data.roleAssignments
    }
  }
  hostColumns: STColumn[] = [
    { title: 'Host', index: 'host' },
    { title: 'IP Address', index: 'ipAddress' },
  ]
  roleColumns: STColumn[] = [
    { title: 'Role', index: 'role' },
    { title: 'Description', index: 'description' },
  ]

  constructor(
    private drawer: NzDrawerRef,
    private msgSrv: NzMessageService,
    @Inject(DA_SERVICE_TOKEN) private tokenSrv: ITokenService,
    private http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`/users/${this.record.userId}`).subscribe(res => {
      res.firstName = res.data.user.firstName;
      res.lastName = res.data.user.lastName;
      res.username = res.data.user.username;
      res.tenant = res.data.tenant.role;

      this.i = res
    });
  }

  concatName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
  }

  close(): void {
    this.drawer.close();
  }
}
