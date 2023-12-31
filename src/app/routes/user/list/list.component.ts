import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STRes } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { UserCreateComponent } from '../create/create.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDetailsComponent } from '../details/details.component';
import { UserEditComponent } from '../edit/edit.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html'
})
export class UserListComponent implements OnInit {
  url = `/users`;
  res: STRes = {
    process: (_, res) => {
      for (const user of res.data.users) {
        if (!user.status) {
          user.className = 'text-red-light font-italic'
        }
      }
      return res.data.users;
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
    { title: 'Id', index: 'userId' },
    { title: 'First Name', index: 'firstName' },
    { title: 'Last Name', index: 'lastName' },
    { title: 'username', index: 'username' },
    {
      title: '',
      buttons: [
        {
          text: 'Details',
          icon: 'bars',
          type: 'drawer',
          drawer: {
            title: 'Details',
            component: UserDetailsComponent,
            size: 'xl'
          }
        },
        {
          text: 'Edit',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: UserEditComponent
          },
          click: () => {
            this.st.reload();
          }
        },
        {
          text: 'Delete',
          icon: 'delete',
          type: 'del',
          className: 'text-red-light',
          pop: {
            title: 'Are you sure you want to delete the user?',
            okType: 'danger',
            okText: 'Delete',
            icon: 'warning'
          },
          click: record => {
            this.http.delete(`/users/${record.userId}`).pipe(
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
            });
          }
        },
        {
          text: 'More ',
          children: [
            {
              text: 'Deactivate',
              icon: 'lock',
              type: 'del',
              iif: record => record.status,
              pop: {
                title: 'Are you sure you want to deactivate the user?',
                okType: 'danger',
                okText: 'Deactivate',
                icon: 'warning'
              },
              click: record => {
                this.http.patch(`/users/status/${record.userId}`).pipe(
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
                });
              }
            },
            {
              text: 'Activate',
              icon: 'unlock',
              type: 'del',
              iif: record => !record.status,
              pop: {
                title: 'Are you sure you want to activate the user?',
                okType: 'danger',
                okText: 'Activate',
                icon: 'warning'
              },
              click: record => {
                this.http.patch(`/users/status/${record.userId}`).pipe(
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
                });
              }
            }
          ],
        }
      ]
    }
  ];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private modalSrv: NzModalService,
    private msgSrv: NzMessageService
  ) {}

  ngOnInit(): void {}

  add(): void {
    this.modal.createStatic(UserCreateComponent).subscribe(() => {
      this.st.reload()
    });
  }
}
