import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { RoleRoutingModule } from './role-routing.module';
import { RoleListComponent } from './list/list.component';
import { RoleCreateComponent } from './create/create.component';
import { RoleEditComponent } from './edit/edit.component';

const COMPONENTS: Type<void>[] = [
  RoleListComponent,
  RoleCreateComponent,
  RoleEditComponent];

@NgModule({
  imports: [
    SharedModule,
    RoleRoutingModule
  ],
  declarations: COMPONENTS,
})
export class RoleModule { }
