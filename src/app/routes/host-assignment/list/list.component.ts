import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STRes } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { HostAssignmentEditComponent } from '../edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-host-assignment-list',
  templateUrl: './list.component.html',
})
export class HostAssignmentListComponent implements OnInit {
  url = `/users`;
  res: STRes = {
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
          click: (i, modal) => {
            if (modal) {
              this.msgSrv.success('Host Assignment Successful')
            }
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
