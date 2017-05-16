import { } from 'jasmine'
import { inject, TestBed } from "@angular/core/testing";
import { DynamicTemplateBuilder } from "./template.builder"
import { IDomNode } from "./domnode.model"

describe('template.builder test', () => {
    let templateBuilder: DynamicTemplateBuilder;

    beforeEach(() => {
        templateBuilder = new DynamicTemplateBuilder();
    });

    it('OK', () => {
        var entity: IDomNode = {
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
                {
                    "tag": "input", "attributes": {
                        "type": "text",
                        "value": "test",
                        "style": "color: green"
                    }
                }
            ]
        };

        expect("<form><div><span style = 'color: red'><label>Enter value:</label></span> <input type = 'text' value = 'test' style = 'color: green'/></div></form>").toBe(templateBuilder.prepareTemplate(entity));

    });

});
