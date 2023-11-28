import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { HostRoutingModule } from './host-routing.module';
import { SGModule } from '@delon/abc/sg';
import { HostCreateComponent } from './create/create.component';
import { HostListComponent } from './list/list.component';
import { HostEditComponent } from './edit/edit.component'

const COMPONENTS: Type<void>[] = [
  HostCreateComponent,
  HostListComponent,
  HostEditComponent];

@NgModule({
  imports: [
    SharedModule,
    SGModule,
    HostRoutingModule
  ],
  declarations: COMPONENTS,
})
export class HostModule { }
