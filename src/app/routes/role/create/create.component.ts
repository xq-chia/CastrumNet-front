import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { map } from 'rxjs';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './create.component.html'
})
export class RoleCreateComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      role: { type: 'string', title: 'Role' },
      description: { type: 'string', title: 'Description' },
      parentIds: { type: 'string', title: 'Role Inheritance' },
      permissions: {
        type: 'array',
        title: 'Permission',
        minItems: 1,
        default: [{}],
        items: {
          type: 'object',
          properties: {
            object: { type: 'string', title: 'Command' },
            allow: { type: 'boolean', title: 'Rule' }
          }
        }
      }
    },
    required: ['roleId', 'role', 'description']
  };
  ui: SFUISchema = {
    $parentIds: {
      widget: 'select',
      mode: 'multiple',
      asyncData: () => this.fetchAllRoles().pipe(map(roles => roles.map(role => this.convertRoleToSchema(role))))
    },
    $permissions: {
      grid: { arraySpan: 24 },
      $items: {
        $allow: {
          checkedChildren: 'Allow',
          unCheckedChildren: 'Deny'
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

  ngOnInit(): void {}

  save(value: any): void {
    this.http.post(`/role`, value).subscribe(res => {
      this.msgSrv.success('Role Created');
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }

  fetchAllRoles() {
    return this.roleService.fetchAllRoles();
  }

  convertRoleToSchema(role: any) {
    return { label: `${role.role} | ${role.description}`, value: role.roleId };
  }
}
