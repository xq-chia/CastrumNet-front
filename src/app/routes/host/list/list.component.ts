import { Component, OnInit } from '@angular/core';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { HostCreateComponent } from '../create/create.component';
import { HostEditComponent } from '../edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-host-list',
  templateUrl: './list.component.html',
})
export class HostListComponent implements OnInit {
  hosts: any[] = []

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService
  ) { }

  ngOnInit(): void {
    this.http.get('/host').pipe(
      catchError(err => {
        this.msgSrv.error(err.error.msg);
        return of(null);
      })
    ).subscribe(res => {
      if (res == null) {
        return ;
      }
      this.hosts = res.data.hosts
    })
  }

  add(): void {
    this.modal.createStatic(HostCreateComponent).subscribe(res => {
      this.ngOnInit();
    });
  }
  
  edit(hostId: number): void {
    this.modal.createStatic( HostEditComponent, { record: { hostId: hostId } }).subscribe(res => {
      this.ngOnInit();
    })
  }

  delete(hostId: number): void {
    this.http.delete(`/host/${hostId}`).pipe(
      catchError(err => {
        this.msgSrv.error(err.error.msg);
        return of(null)
      })
    ).subscribe(res => {
      if (res == null) {
        this.ngOnInit();
        return ;
      }
      this.msgSrv.success(res.data.msg);
      this.ngOnInit();
    })
  }
}
