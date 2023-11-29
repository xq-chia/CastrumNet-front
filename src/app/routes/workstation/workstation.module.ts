import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { WorkstationRoutingModule } from './workstation-routing.module';
import { WorkstationListComponent } from './list/list.component';
import { SGModule } from '@delon/abc/sg';

const COMPONENTS: Type<void>[] = [
  WorkstationListComponent];

@NgModule({
  imports: [
    SharedModule,
    WorkstationRoutingModule,
    SGModule
  ],
  declarations: COMPONENTS,
})
export class WorkstationModule { }
