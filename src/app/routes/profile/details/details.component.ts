import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { STColumn, STRes } from '@delon/abc/st';
import { DA_SERVICE_TOKEN, ITokenService, TokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-profile-details',
  templateUrl: './details.component.html',
})
export class ProfileDetailsComponent implements OnInit {
  userId: number = this.tokenSrv.get()!['id'];
  user: any;
  tenant: any;

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
    private http: _HttpClient,
    private route: ActivatedRoute,
    @Inject(DA_SERVICE_TOKEN) private tokenSrv: ITokenService,
  ) { }

  ngOnInit(): void {
    this.http.get(`/users/${this.userId}`).subscribe(res => {
      this.user = res.data.user;
      this.tenant = res.data.tenant;
    })
  }

  concatName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
  }

  edit() {

  }
}
