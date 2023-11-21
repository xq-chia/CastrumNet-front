import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { RoleAssignmentRoutingModule } from './role-assignment-routing.module';
import { RoleAssignmentListComponent } from './list/list.component';

const COMPONENTS: Type<void>[] = [
  RoleAssignmentListComponent];

@NgModule({
  imports: [
    SharedModule,
    RoleAssignmentRoutingModule
  ],
  declarations: COMPONENTS,
})
export class RoleAssignmentModule { }
