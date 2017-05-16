/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from "chai";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import {dispatchEvent} from "../shared/testutils"
import { MacAddressDirective } from './macaddress.directive'
import { MyDirectives } from './directives.module'

@Component({
    selector: 'container',
    template: '<input macaddress type="text">'
})
export class Container {
}

describe("MACAsddressDirective", () => {
    let fixture;
    let component;
    let el;
    let input;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MyDirectives],
            declarations: [Container]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Container);
        component = fixture.componentInstance;
        el = fixture.debugElement.nativeElement;
        input = fixture.debugElement.query(By.css('input')).nativeElement;
        fixture.detectChanges();
    });

    it('MacAddressDirective', fakeAsync(() => {
        input.value = '1EABCDF2';
        dispatchEvent(input, 'input');
        fixture.detectChanges();

        // no value on sku field, all error messages are displayed
        expect(input.value).toBe("1E:AB:CD:F2");
    }));

    it('MacAddressDirective non hex literal', fakeAsync(() => {
        input.value = 'LLL';
        dispatchEvent(input, 'input');
        fixture.detectChanges();

        // no value on sku field, all error messages are displayed
        expect(input.value).toBe("");
    }));

    it('MacAddressDirective russian letter replace', fakeAsync(() => {
        input.value = 'АВСЕ';
        dispatchEvent(input, 'input');
        fixture.detectChanges();

        // no value on sku field, all error messages are displayed
        expect(input.value).toBe("AB:CE");
    }));

    it('MacAddressDirective max len 12', fakeAsync(() => {
        input.value = '12345678901234';
        dispatchEvent(input, 'input');
        fixture.detectChanges();

        // no value on sku field, all error messages are displayed
        expect(input.value).toBe("");
    }));

});
