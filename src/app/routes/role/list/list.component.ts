import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STRes } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { RoleCreateComponent } from '../create/create.component';
import { RoleEditComponent } from '../edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleDetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html'
})
export class RoleListComponent implements OnInit {
  url = `/role`;
  res: STRes ={
    process: (_, res) => {
      return res.data
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
          click: (i, modal) => {
            if (modal) {
              this.msgSrv.success('Role Edited');
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
            this.http.delete(`/role/${record.roleId}`).subscribe(res => {
              this.msgSrv.success('Role Deleted');
              this.st.reload();
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
    this.modal.createStatic(RoleCreateComponent).subscribe(() => this.st.reload());
  }
}
