import {Injectable} from "@angular/core";

import * as _ from 'lodash'; 

import { IDomNode } from './domnode.model'

@Injectable()
export class DynamicTemplateBuilder {

    private prepareTemplateInner(template: string, entity: IDomNode): string  {

        if (entity.tag) {
            template += "<" + entity.tag;    
        }

        if (entity.text) {
            template += "<label>" + entity.text + "</label>";
        }

        if (entity.attributes) {
            let attrs = _.toPairs(entity.attributes).map(item => { return item[0] + " = '" + item[1] + "'" });
            template += " " + attrs.join(" ");
        }

        if (entity.tag) {
            if( entity.tag === 'input') {
                template += "/>";
            } else {
                template += ">";
            }  
        } 
        
        if (entity.content ) {
            let items = entity.content.map(x => {
                return this.prepareTemplateInner("", x);
            });

            template += items.join(" ");

            template += "</" + entity.tag + ">";
        }

        

        return template;
    }


    public prepareTemplate(entity: IDomNode) {
        let template = "<form>";

        template += this.prepareTemplateInner("", entity);

        return template + "</form>";
    }
  
}