import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// parts module
import { PartsModule }   from '../parts/parts.module';

// detail stuff
import { DynamicContentComponent } from './dynamic.component';
import { DynamicTypeBuilder }      from './type.builder';
import { DynamicTemplateBuilder } from './template.builder';
import { DynamicLoadServiceInjectables } from "./dynamic.injectables";

@NgModule({
  imports:      [ PartsModule ],
  declarations: [ DynamicContentComponent ],
  exports: [ DynamicContentComponent ],
})

export class DynamicModule {

    static forRoot()
    {
        return {
            ngModule: DynamicModule,
            providers: [ // singletons accross the whole app
                DynamicTemplateBuilder,
                DynamicTypeBuilder,
                DynamicLoadServiceInjectables
            ], 
        };
    }
}