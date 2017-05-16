import { Directive, ElementRef, Renderer, Output, HostListener, OnChanges, SimpleChange  } from "@angular/core"

@Directive({
    selector: '[macaddress]'       
})
export class MacAddressDirective implements  OnChanges {

    prevValue: string;

    constructor(private el: ElementRef, private renderer: Renderer) {
        renderer.setElementStyle(el.nativeElement, "background-color", 'yellow');
        this.prevValue = this.el.nativeElement.value;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        console.log('Changes', changes);
    }

    @HostListener('input') onInput() {
        let value: string = this.el.nativeElement.value;

        value = value.toUpperCase();
        value = value.replace(/:/g, "");
        value = value.replace(/А/g, "A");
        value = value.replace(/В/g, "B");
        value = value.replace(/С/g, "C");
        value = value.replace(/Е/g, "E");

        if (value.length == 0) {
            this.prevValue = "";
        }

        console.log("Value before match: " + value);

        if (value.length <= 12 && value.match(/^[A-Fa-f0-9]+$/g) != null ) {
            value = value.replace(/([A-Fa-f0-9]{2})/gi,
                function(str, str2, offset) {
                    console.log(str);
                    console.log(str2);
                    console.log(offset);
                    return offset > 0 ? ":" + str : str;
                });

            this.prevValue = value;
        } else {
            value = this.prevValue;
        }


        this.el.nativeElement.value = value;
    }
}
