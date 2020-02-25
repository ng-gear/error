import { AfterContentInit, ContentChild, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { NggError } from './error';
import { NggErrorService } from './error.service';
import { NggErrorDirective } from './error.directive';

@Directive({
  selector: '[nggErrorResolver]'
})
export class NggErrorResolverDirective implements AfterContentInit {
  private readonly errorService: NggErrorService;
  private errorDirective: NggErrorDirective | null = null;

  @ContentChild(NgControl) ngControl: NgControl;
  errorStream: Observable<NggError | null>;

  constructor(errorService: NggErrorService) {
    this.errorService = errorService;
  }

  attach(errorDirective: NggErrorDirective): void {
    this.errorDirective = errorDirective;

    if (this.errorStream) {
      errorDirective.resolverReady();
    }
  }

  showError(): boolean {
    return !!this.ngControl?.control && this.errorService.showError(this.ngControl.control);
  }

  ngAfterContentInit(): void {
    const { control, path } = this.ngControl;

    if (!control) {
      throw new Error('The nggErrorResolver requires a NgControl in the content');
    }

    this.errorStream = control.statusChanges.pipe(
      startWith(null),
      filter(() => !!this.ngControl.errors),
      switchMap(() => this.errorService.getError(control, path))
    );

    this.errorDirective?.resolverReady();
  }
}
