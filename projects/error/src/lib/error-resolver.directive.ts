import { AfterContentInit, ContentChild, Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { NggError } from './error';
import { NggErrorDirective } from './error.directive';
import { NggErrorService } from './error.service';

@Directive({
  selector: '[nggErrorResolver]'
})
export class NggErrorResolverDirective implements AfterContentInit {
  private readonly errorService: NggErrorService;
  private errorDirective: NggErrorDirective | null = null;

  @Input() identifier: string | null = null;

  @ContentChild(NgControl) ngControl: NgControl;
  errorStream: Observable<NggError | null>;

  constructor(errorService: NggErrorService) {
    this.errorService = errorService;
  }

  ngAfterContentInit(): void {
    if (!this.ngControl?.control) {
      throw new Error('The nggErrorResolver requires a NgControl in the content');
    }

    this.updateIdentifier();

    const { control } = this.ngControl;
    this.errorStream = control.statusChanges.pipe(
      startWith(null),
      filter(() => !!this.ngControl.errors),
      switchMap(() => this.errorService.getError(control, this.identifier))
    );

    this.errorDirective?.resolverReady();
  }

  attach(errorDirective: NggErrorDirective): void {
    this.errorDirective = errorDirective;

    if (this.errorStream) {
      errorDirective.resolverReady();
    }
  }

  showError(): boolean {
    return !!this.ngControl.control && this.errorService.showError(this.ngControl.control, this.identifier);
  }

  updateIdentifier(): void {
    if (this.identifier) {
      return;
    }

    this.identifier = this.errorService.pathToIdentifier(this.ngControl.path);
  }
}
