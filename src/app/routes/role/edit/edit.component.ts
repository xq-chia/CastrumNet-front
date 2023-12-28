import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { RoleService } from '../role.service';
import { catchError, map, of } from 'rxjs';

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
      role: {
        type: 'string',
        title: 'Role',
        maxLength: 50
      },
      description: {
        type: 'string',
        title: 'Description',
        maxLength: 100
      },
      parentIds: {
        type: 'string',
        title: 'Role Inheritance',
        default: []
      },
      permissions: {
        type: 'array',
        title: 'Permission',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            object: { type: 'string', title: 'Command' },
            allow: { type: 'boolean', title: 'Rule' }
          },
          required: ['object']
        }
      },
      files: {
        type: 'array',
        title: 'Blocked File',
        default: [{}],
        items: {
          type: 'object',
          properties: {
            path: { type: 'string', title: 'Absolute Path' }
          },
          required: ['path']
        }
      }
    },
    required: ['role', 'description']
  };
  ui: SFUISchema = {
    $roleId: {
      hidden: true
    },
    $parentIds: {
      widget: 'select',
      mode: 'multiple',
      asyncData: () => this.fetchAllRoles().pipe(
        map((res: any) => res.data.roles),
        map(roles => roles.map((role: any) => ({ label: `${role.role} | ${role.description}`, value: role.roleId })))
      )
    },
    $permissions: {
      grid: { arraySpan: 24 },
      $items: {
        $allow: {
          checkedChildren: 'Allow',
          unCheckedChildren: 'Deny'
        }
      }
    },
    $files: {
      grid: { arraySpan: 24 }
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
        res.data.parentIds = res.data.parentRoles.map((role: any) => role.roleId);
        this.i = res.data;
      });
    }
  }

  edit(value: any): void {
    this.http.patch(`/role/${this.record.roleId}`, value).pipe(
      catchError(err => {
        this.modal.close(err);
        return of(null)
      })
    ).subscribe(res => {
      if (res == null) {
        return ;
      }
      this.modal.close(res);
    });
  }

  close(): void {
    this.modal.destroy();
  }

  fetchAllRoles() {
    return this.roleService.fetchAllRoles();
  }
}
