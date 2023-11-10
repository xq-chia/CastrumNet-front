import { Component, OnInit } from '@angular/core';
import { SFSchema, SFSchemaEnumType, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, Subject, delay, map, of, tap } from 'rxjs';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './create.component.html',
})
export class RoleCreateComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      roleId: { type: 'number', title: 'Role Id' },
      role: { type: 'string', title: 'Role' },
      description: { type: 'string', title: 'Description' },
      parentIds: { type: 'string', title: 'Role Inheritance' }
    },
    required: ['roleId', 'role', 'description'],
  };
  ui: SFUISchema = {
    $parentIds: {
      widget: 'select',
      mode: 'tags',
      default: null,
      asyncData: () => this.fetchAllRoles().pipe(
        map(roles => roles.map(role => this.convertRoleToSchema(role)))
      )
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private roleService: RoleService
  ) {}

  ngOnInit(): void { }

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
    return this.roleService.fetchAllRoles()
  }

  convertRoleToSchema(role: any) {
    return { label: `${role.role} | ${role.description}`, value: role.roleId };
  }
}
