import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { RoleCreateComponent } from '../create/create.component';
import { RoleEditComponent } from '../edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html'
})
export class RoleListComponent implements OnInit {
  url = `/role`;
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
    { title: 'Id', type: 'number', index: 'roleId' },
    { title: 'Role', index: 'role' },
    { title: 'Description', index: 'description' },
    {
      title: '',
      buttons: [
        {
          text: 'Edit',
          type: 'modal',
          modal: {
            component: RoleEditComponent
          },
          click: (i, modal) => {
            if (modal) {
              this.msgSrv.success('Role Edited')
            }
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
  ) {}

  ngOnInit(): void {}

  add(): void {
    this.modal
    .createStatic(RoleCreateComponent)
    .subscribe(() => this.st.reload());
  }

  viewDetails(role: any) {
    this.modal
    .createStatic(RoleCreateComponent)
    .subscribe(() => this.st.reload());
  }
}
