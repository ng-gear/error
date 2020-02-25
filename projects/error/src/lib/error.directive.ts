import { Directive, DoCheck, Host, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { NggError } from './error';
import { NggErrorResolverDirective } from './error-resolver.directive';

class NggErrorContext {
  $implicit: NggError;

  constructor(value: NggError) {
    this.$implicit = value;
  }
}

@Directive({
  selector: '[nggError]'
})
export class NggErrorDirective implements OnInit, DoCheck {
  private readonly templateRef: TemplateRef<NggErrorContext>;
  private readonly viewContainerRef: ViewContainerRef;
  private readonly errorResolver: NggErrorResolverDirective;

  private error: NggError | null = null;

  constructor(
    templateRef: TemplateRef<NggErrorContext>,
    viewContainerRef: ViewContainerRef,
    @Host() errorResolver: NggErrorResolverDirective
  ) {
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.errorResolver = errorResolver;
  }

  ngOnInit(): void {
    this.errorResolver.attach(this);
  }

  resolverReady(): void {
    this.errorResolver.errorStream.subscribe((error) => {
      this.error = error;
      this.updateTemplate(error);
    });
  }

  ngDoCheck(): void {
    this.updateTemplate(this.error);
  }

  private updateTemplate(error: NggError | null): void {
    this.viewContainerRef.clear();
    if (!error || !this.errorResolver.showError()) {
      return;
    }

    this.viewContainerRef.createEmbeddedView(this.templateRef, new NggErrorContext(error));
  }
}
