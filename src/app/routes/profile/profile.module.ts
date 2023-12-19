import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailsComponent } from './details/details.component';

const COMPONENTS: Type<void>[] = [
  ProfileDetailsComponent];

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: COMPONENTS,
})
export class ProfileModule { }
