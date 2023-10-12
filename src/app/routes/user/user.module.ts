import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './list/list.component';
import { UserCreateComponent } from './create/create.component';

const COMPONENTS: Type<void>[] = [
  UserListComponent,
  UserCreateComponent];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: COMPONENTS,
})
export class UserModule { }
