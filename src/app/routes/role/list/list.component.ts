import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STRes } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { RoleCreateComponent } from '../create/create.component';
import { RoleEditComponent } from '../edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleDetailsComponent } from '../details/details.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html'
})
export class RoleListComponent implements OnInit {
  url = `/role`;
  res: STRes ={
    process: (_, res) => {
      return res.data.roles
    }
  }
  searchSchema: SFSchema = {
    properties: {
      q: {
        type: 'string',
        title: 'Keyword'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: 'Id', type: 'number', index: 'roleId' },
    { title: 'Role', index: 'role' },
    { title: 'Description', index: 'description' },
    {
      title: '',
      buttons: [
        {
          text: 'Details',
          icon: 'bars',
          type: 'drawer',
          drawer: {
            title: 'Details',
            component: RoleDetailsComponent,
            size: 'xl'
          }
        },
        {
          text: 'Edit',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: RoleEditComponent
          },
          click: (i, res) => {
            if (res.error) {
              this.msgSrv.error(res.error.msg)
            } else {
              this.msgSrv.success(res.data.msg);
            }
            this.st.reload();
          }
        },
        {
          text: 'Delete',
          icon: 'delete',
          type: 'del',
          className: 'text-red-light',
          pop: {
            title: 'Are you sure you want to delete the role?',
            okType: 'danger',
            okText: 'Delete',
            icon: 'warning'
          },
          click: record => {
            this.http.delete(`/role/${record.roleId}`).pipe(
              catchError(err => {
                this.msgSrv.error(err.error.msg);
                return of(null);
              })
            ).subscribe(res => {
              this.st.reload();
              if (res == null) {
                return ;
              }
              this.msgSrv.success(res.data.msg);
            })
          }
        }
      ]
    }
  ];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService
  ) {}

  ngOnInit(): void {}

  add(): void {
    this.modal.createStatic(RoleCreateComponent).pipe(
      catchError(err => {
        this.msgSrv.error(err.error.msg);
        return of(null);
      })
    ).subscribe(res =>{
      this.st.reload()
      if (res == null) {
        return ;
      }
      this.msgSrv.success(res.data.msg);
    });
  }
}
