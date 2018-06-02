import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { DynamicComponentDirective } from '../../../directives/dynamic.component.directive';
import { ComponentMount }      from '../../component.mount';
import { AuthClass } from './authenticator.class';
import {AuthenticatorIonicComponent} from './authenticator.component.ionic'
import { AuthenticatorComponentCore } from './authenticator.component.core';

@Component({
  selector: 'amplify-authenticator',
  template: `
              <div>
                <ng-template component-host></ng-template>
              </div>
            `
})
export class AuthenticatorComponent implements OnInit, OnDestroy {
  @Input() ionic: boolean
  @ViewChild(DynamicComponentDirective) componentHost: DynamicComponentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnDestroy() {}

  loadComponent() {

    let authComponent = this.ionic ? new ComponentMount(AuthenticatorIonicComponent,{}) : new ComponentMount(AuthenticatorComponentCore, {});

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(authComponent.component);

    let viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AuthClass>componentRef.instance).data = authComponent.data;
  }
}


