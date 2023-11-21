import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { RoleAssignmentRoutingModule } from './role-assignment-routing.module';
import { RoleAssignmentListComponent } from './list/list.component';
import { RoleAssignmentEditComponent } from './edit/edit.component';

const COMPONENTS: Type<void>[] = [
  RoleAssignmentListComponent,
  RoleAssignmentEditComponent];

@NgModule({
  imports: [
    SharedModule,
    RoleAssignmentRoutingModule
  ],
  declarations: COMPONENTS,
})
export class RoleAssignmentModule { }
