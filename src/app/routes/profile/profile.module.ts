import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailsComponent } from './details/details.component';
import { ProfileEditComponent } from './edit/edit.component';

const COMPONENTS: Type<void>[] = [
  ProfileDetailsComponent,
  ProfileEditComponent];

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: COMPONENTS,
})
export class ProfileModule { }
