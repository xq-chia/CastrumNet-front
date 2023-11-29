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
    this.http.get(`/userHost/${this.userId}`).subscribe((userHosts: any[]) => {
      this.userHosts = userHosts;
  
      // Create an array of observables for host requests
      const hostDetails$ = this.userHosts.map(userHost => this.http.get(`/host/${userHost.hostId}`));
  
      // Use forkJoin to make parallel requests
      forkJoin(hostDetails$).subscribe(hostDetails => {
        this.userHosts = hostDetails;
      });
    });
  }
}
