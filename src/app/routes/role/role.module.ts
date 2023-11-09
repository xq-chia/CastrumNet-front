import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { RoleRoutingModule } from './role-routing.module';
import { RoleListComponent } from './list/list.component';

const COMPONENTS: Type<void>[] = [
  RoleListComponent];

@NgModule({
  imports: [
    SharedModule,
    RoleRoutingModule
  ],
  declarations: COMPONENTS,
})
export class RoleModule { }
