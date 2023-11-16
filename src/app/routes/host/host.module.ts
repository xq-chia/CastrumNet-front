import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { HostRoutingModule } from './host-routing.module';
import { SGModule } from '@delon/abc/sg';
import { HostCreateComponent } from './create/create.component';
import { HostListComponent } from './list/list.component'

const COMPONENTS: Type<void>[] = [
  HostCreateComponent,
  HostListComponent];

@NgModule({
  imports: [
    SharedModule,
    SGModule,
    HostRoutingModule
  ],
  declarations: COMPONENTS,
})
export class HostModule { }
