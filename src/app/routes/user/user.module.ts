import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './list/list.component';

const COMPONENTS: Type<void>[] = [
  UserListComponent];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: COMPONENTS,
})
export class UserModule { }
