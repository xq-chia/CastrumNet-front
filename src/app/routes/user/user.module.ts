import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './list/list.component';
import { UserCreateComponent } from './create/create.component';
import { UserDetailsComponent } from './details/details.component';
import { UserEditComponent } from './edit/edit.component';

const COMPONENTS: Type<void>[] = [
  UserListComponent,
  UserCreateComponent,
  UserDetailsComponent,
  UserEditComponent];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: COMPONENTS,
})
export class UserModule { }
