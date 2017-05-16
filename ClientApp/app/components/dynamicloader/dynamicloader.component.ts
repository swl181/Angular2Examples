import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dynamic-loader-component',
    templateUrl: './dynamicloader.component.html'
})
export class DynamicLoaderComponent {
    code1: string = `
interface IDomNode {
    tag: string | undefined;
    attributes: { [key: string]: string };
    content: IDomNode[];
    text?: string;
}`;

    code2: string = `
{
    "tag": "div",
    "content": [
        {
            "tag": "span",
            "attributes": {
   		     "style": "color: red"
   		 },
            "content": [
                { "text": "Enter value:" }
            ]
   	 },
        { "tag": "input", "attributes": {
                "type": "text",
                "value": "test",
   	    	 "style": "color: green"
            }
        }
    ]
}
`;
}
