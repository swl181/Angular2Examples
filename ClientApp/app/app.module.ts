import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { DynamicLoaderComponent } from './components/dynamicloader/dynamicloader.component';
import { MacAddressComponent } from './components/macaddress/macaddress.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDirectives } from "./directives/directives.module"

import { COMPILER_PROVIDERS } from '@angular/compiler';
import { DynamicModule } from './components/dynamic/dynamic.module';


@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent, 
        MacAddressComponent,
        DynamicLoaderComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'macaddress', component: MacAddressComponent },
            { path: 'dynamicloadingcomponent', component: DynamicLoaderComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        MyDirectives,
        DynamicModule.forRoot(),
    ],
    providers: [
        COMPILER_PROVIDERS // this is an app singleton declaration
    ],
})
export class AppModule {
}
