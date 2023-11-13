import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { UserCreateComponent } from '../create/create.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDetailsComponent } from '../details/details.component';

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
          text: 'Freeze',
          icon: 'lock',
          type: 'del',
          pop: {
            title: 'Are you sure you want to freeze the user?',
            okType: 'danger',
            okText: 'Freeze',
            icon: 'warning'
          },
          click: record => {
            this.http.patch(`/users/freeze/${record.userId}`)
              .subscribe(res => {
                this.msgSrv.success(`${record.username} has been frozen`);
                this.st.reload();
              })
          }
        },
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

  add(): void {
    this.modal
      .createStatic(UserCreateComponent)
      .subscribe(() => this.st.reload());
  }

}
