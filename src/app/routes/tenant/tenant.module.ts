import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

const COMPONENTS: Type<void>[] = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: COMPONENTS,
})
export class TenantModule { }
