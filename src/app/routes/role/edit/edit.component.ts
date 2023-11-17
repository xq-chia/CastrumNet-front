import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { RoleService } from '../role.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-role-edit',
  templateUrl: './edit.component.html',
})
export class RoleEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      roleId: { type: 'number', title: 'Role Id', readOnly: true },
      role: { type: 'string', title: 'Role' },
      description: { type: 'string', title: 'Description' },
      parentIds: { type: 'string', title: 'Role Inheritance' },
      permissions: {
        type: 'array',
        title: 'Permission',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            object: { type: 'string', title: 'Command' },
            allow: { type: 'boolean', title: 'Rule' }
          }
        }
      }
    },
    required: ['owner', 'callNo', 'href', 'description'],
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
    public http: _HttpClient,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    if (this.record.roleId > 0) {
      this.http.get(`/role/${this.record.roleId}`).subscribe(res => {
        res.parentIds = res.parentRoles.map((role: any) => role.roleId),
        this.i = res;
      });
    }
  }

  edit(value: any): void {
    this.http.patch(`/role/${this.record.roleId}`, value).subscribe(res => {
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
