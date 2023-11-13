import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './list/list.component';
import { UserCreateComponent } from './create/create.component';
import { UserDetailsComponent } from './details/details.component';

const COMPONENTS: Type<void>[] = [
  UserListComponent,
  UserCreateComponent,
  UserDetailsComponent];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: COMPONENTS,
})
export class UserModule { }
