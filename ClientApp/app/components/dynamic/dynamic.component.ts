import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { OnChanges, SimpleChange, ComponentFactory } from '@angular/core';

import { IHaveDynamicData, DynamicTypeBuilder } from './type.builder';
import { DynamicTemplateBuilder } from './template.builder';
import { DynamicLoadService } from './dynamic.service'

@Component({
    selector: 'dynamic-content',
    template: '<div> This is dynamic content <div #dynamicContentPlaceHolder></div></div>'
})
export class DynamicContentComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {

    // reference for a <div> with #dynamicContentPlaceHolder
    @ViewChild('dynamicContentPlaceHolder', { read: ViewContainerRef })
    protected dynamicComponentTarget: ViewContainerRef;

    // this will be reference to dynamic content - to be able to destroy it
    protected componentRef: ComponentRef<IHaveDynamicData>;

    // until ngAfterViewInit, we cannot start (firstly) to process dynamic stuff
    protected wasViewInitialized = false;

    // example entity ... to be recieved from other app parts
    // this is kind of candiate for @Input

    constructor(
        protected typeBuilder: DynamicTypeBuilder,
        protected templateBuilder: DynamicTemplateBuilder,
        private dynamicLoadService: DynamicLoadService
    )
    { }

    /** Get a Factory and create a component */

    protected refreshContent(useTextarea: boolean = false) {

        if (this.componentRef) {
            this.componentRef.destroy();
        }

        // here we get a TEMPLATE with dynamic content === TODO
        this.dynamicLoadService.load().subscribe(entity => {
            console.log(entity);

            var template = this.templateBuilder.prepareTemplate(entity);

            // here we get Factory (just compiled or from cache)
            this.typeBuilder
                .createComponentFactory(template)
                .then((factory: ComponentFactory<IHaveDynamicData>) => {
                    // Target will instantiate and inject component (we'll keep reference to it)
                    this.componentRef = this
                        .dynamicComponentTarget
                        .createComponent(factory);

                    // let's inject @Inputs to component instance
                    let component = this.componentRef.instance;

                    component.entity = entity;
                    //...
                });
        });
    }

    /** IN CASE WE WANT TO RE/Gerante - we need cean up */

    // this is the best moment where to start to process dynamic stuff
    public ngAfterViewInit(): void {
        this.wasViewInitialized = true;
        this.refreshContent();
    }
    // wasViewInitialized is an IMPORTANT switch 
    // when this component would have its own changing @Input()
    // - then we have to wait till view is intialized - first OnChange is too soon
    public ngOnChanges(changes: { [key: string]: SimpleChange }): void {
        if (this.wasViewInitialized) {
            return;
        }
        this.refreshContent();
    }
    public ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

    ngOnInit(): void { }
}