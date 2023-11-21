import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { HostAssignmentRoutingModule } from './host-assignment-routing.module';
import { HostAssignmentListComponent } from './list/list.component';

const COMPONENTS: Type<void>[] = [
  HostAssignmentListComponent];

@NgModule({
  imports: [
    SharedModule,
    HostAssignmentRoutingModule
  ],
  declarations: COMPONENTS,
})
export class HostAssignmentModule { }
