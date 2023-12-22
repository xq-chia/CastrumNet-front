import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn, STRes } from '@delon/abc/st';
import { DA_SERVICE_TOKEN, ITokenService, TokenService } from '@delon/auth';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { ProfileEditComponent } from '../edit/edit.component';

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
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenSrv: ITokenService,
    private modal: ModalHelper
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
    this.modal.createStatic(ProfileEditComponent, { record: { userId: this.userId } }).subscribe(res => {
      if (res) {
        this.tokenSrv.clear()
        this.router.navigateByUrl('/passport/login')
      }
    })
  }
}
