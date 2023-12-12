import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STRes } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { RoleAssignmentEditComponent } from '../edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-role-assignment-list',
  templateUrl: './list.component.html',
})
export class RoleAssignmentListComponent implements OnInit {
  url = `/users`;
  res: STRes ={
    process: (_, res) => {
      return res.data.users;
    }
  }
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
    { title: 'username', index: 'username' },
    {
      title: '',
      buttons: [
        {
          text: 'Assign',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: RoleAssignmentEditComponent
          },
          click: () => {
            this.st.reload()
          }
        }
      ]
    }
  ];

  constructor(
    private http: _HttpClient, 
    private modal: ModalHelper,
    private msgSrv: NzMessageService
  ) { }

  ngOnInit(): void { }
}
