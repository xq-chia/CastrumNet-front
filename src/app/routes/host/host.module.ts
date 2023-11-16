import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { HostRoutingModule } from './host-routing.module';
import { HostHostComponent } from './host/host.component';
import { SGModule } from '@delon/abc/sg'

const COMPONENTS: Type<void>[] = [
  HostHostComponent,
];

@NgModule({
  imports: [
    SharedModule,
    SGModule,
    HostRoutingModule
  ],
  declarations: COMPONENTS,
})
export class HostModule { }
