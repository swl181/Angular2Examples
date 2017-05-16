import { NgModule } from "@angular/core"
import { MacAddressDirective} from "./macaddress.directive"

@NgModule({
    declarations: [
        MacAddressDirective
    ],
    exports: [
        MacAddressDirective
    ]
})
export class MyDirectives {
}