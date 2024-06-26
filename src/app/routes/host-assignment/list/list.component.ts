import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STRes } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { HostAssignmentEditComponent } from '../edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'app-host-assignment-list',
  templateUrl: './list.component.html',
})
export class HostAssignmentListComponent implements OnInit {
  userId: number = this.tokenSrv.get()!['id'];
  url = `/users?sod=${this.userId}`;
  res: STRes = {
    process: (_, res) => {
      let users: any[];

      users = res.data.users;

      return users;
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
    { title: 'username', index: 'username' },
    {
      title: '',
      buttons: [
        {
          text: 'Assign',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: HostAssignmentEditComponent
          },
          click: () => {
            this.st.reload();
          }
        }
      ]
    }
  ];

  constructor(
    private http: _HttpClient, 
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    @Inject(DA_SERVICE_TOKEN) private tokenSrv: ITokenService,
    ) { }

  ngOnInit(): void { }
}
