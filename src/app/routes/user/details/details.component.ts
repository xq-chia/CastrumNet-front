import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-details',
  templateUrl: './details.component.html',
})
export class UserDetailsComponent implements OnInit {
  record: any = {};
  i: any;
  constructor(
    private drawer: NzDrawerRef,
    private msgSrv: NzMessageService,
    private http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`/users/${this.record.userId}`).subscribe(res => {
      res.firstName = res.user.firstName;
      res.lastName = res.user.lastName;
      res.username = res.user.username;
      res.tenant = res.tenant.role;

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
