import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { UserCreateComponent } from '../create/create.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
})
export class UserListComponent implements OnInit {
  url = `/users`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
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
        { text: 'Freeze', click: (item: any) => this.freeze(item)}
        // { text: 'Freeze', click: (item: any) => console.log(item), modal:this.modal.create },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(
    private http: _HttpClient, 
    private modal: ModalHelper,
    private modalSrv: NzModalService,
    private msgSrv: NzMessageService
    ) { }

  ngOnInit(): void { }

  freeze(user: any): void {
    this.modalSrv.confirm({
      nzTitle: 'You are freezing an employee',
      nzContent: 'User: ' + user.username,
      nzOkText: 'Freeze',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.http.patch(`/users/freeze/${user.userId}`)
        .subscribe(res => {
          this.msgSrv.success(`${user.username} has been frozen`);
        }),
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('cancel')
    });
  }

  add(): void {
    this.modal
    .createStatic(UserCreateComponent)
    .subscribe(() => this.st.reload());
  }

}
