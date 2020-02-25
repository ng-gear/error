import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NGG_ERROR_MANAGEMENT_STRATEGY } from '../../projects/error/src/lib/error-management-strategy';
import { NggErrorModule } from '../../projects/error/src/lib/error.module';
import { AppComponent } from './app.component';
import { ErrorManagementStrategy } from './error-management-strategy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NggErrorModule.forRoot()
  ],
  providers: [
    { provide: NGG_ERROR_MANAGEMENT_STRATEGY, useClass: ErrorManagementStrategy }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
