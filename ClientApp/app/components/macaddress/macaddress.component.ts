import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"

@Component({
    selector: 'home',
    templateUrl: './macaddress.component.html'
})
export class MacAddressComponent {
    myForm: FormGroup;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'macedit': ['123']
        });
    }

    ngOnInit() { }

}
