import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-workstation-list',
  templateUrl: './list.component.html',
})
export class WorkstationListComponent implements OnInit {
  userId: number = this.tokenSrv.get()!['id'];
  userHosts: any[] = []
  hosts: any[] = []

  constructor(
    private http: _HttpClient,
    @Inject(DA_SERVICE_TOKEN) private tokenSrv: ITokenService,
  ) { }
  ngOnInit(): void {
    this.http.get(`/userHost/${this.userId}`).subscribe(res => {
      for (const item of res.data.workstations) {
        item.host.userHostId = item.userHostId
        this.userHosts.push(item.host)
      }
    });
  }
}
