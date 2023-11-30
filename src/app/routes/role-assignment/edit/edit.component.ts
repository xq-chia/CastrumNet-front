import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { RoleService } from '../../role/role.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-role-assignment-edit',
  templateUrl: './edit.component.html'
})
export class RoleAssignmentEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      roleAssignments: {
        type: 'array',
        title: 'Role Assignment',
        items: {
          type: 'object',
          properties: {
            host: { type: 'string', title: 'Host', readOnly: true },
            ipAddress: { type: 'string', title: 'IP Address', readOnly: true },
            roleIds: { type: 'string', title: 'Role' }
          }
        },
      }
    },
    required: ['owner', 'callNo', 'href', 'description']
  };
  ui: SFUISchema = {
    $roleAssignments: {
      removable: false,
      grid: { arraySpan: 24 },
      $items: {
        $roleIds: {
          widget: 'select',
          mode: 'multiple',
          asyncData: () => this.fetchAllRoles().pipe(
            map((res: any) => res.data),
            map(roles => roles.map((role: any) => ({ label: `${role.role} | ${role.description}`, value: role.roleId })))
          )
        }
      }
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    if (this.record.userId > 0) {
      this.http.get(`/roleAssignment/${this.record.userId}`).subscribe(res => {
        this.schema.properties!['roleAssignments'].maxItems = res.data.roleAssignments.length;

        this.i = res.data;
      });
    }
  }

  edit(value: any): void {
    this.http.patch(`/roleAssignment`, value).subscribe(res => {
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }

  fetchAllRoles() {
    return this.roleService.fetchAllRoles();
  }
}
