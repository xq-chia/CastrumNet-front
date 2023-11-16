import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { HostRoutingModule } from './host-routing.module';
import { HostHostComponent } from './host/host.component';
import { SGModule } from '@delon/abc/sg';
import { HostCreateComponent } from './create/create.component'

const COMPONENTS: Type<void>[] = [
  HostHostComponent,
  HostCreateComponent];

@NgModule({
  imports: [
    SharedModule,
    SGModule,
    HostRoutingModule
  ],
  declarations: COMPONENTS,
})
export class HostModule { }
