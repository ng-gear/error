import { ModuleWithProviders, NgModule } from '@angular/core';

import { NggErrorResolverDirective } from './error-resolver.directive';
import { NggErrorDirective } from './error.directive';
import { NggErrorService } from './error.service';

const EXPORTED_DECLARATIONS = [
  NggErrorDirective,
  NggErrorResolverDirective
];

@NgModule({
  declarations: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS
})
export class NggErrorModule {
  static forRoot(): ModuleWithProviders<NggErrorModule> {
    return {
      ngModule: NggErrorModule,
      providers: [
        NggErrorService
      ]
    };
  }

  static forChild(): ModuleWithProviders<NggErrorModule> {
    return {
      ngModule: NggErrorModule
    };
  }
}
