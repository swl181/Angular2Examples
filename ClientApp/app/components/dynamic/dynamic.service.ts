import { Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http'
import { IDomNode } from './domnode.model'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export const API_URL: string = "/api/SampleData/DomNodes";

@Injectable()
export class DynamicLoadService {
    constructor(private http: Http,
        @Inject(API_URL) private apiUrl: string) {
    }

    public load(): Observable<IDomNode> {
        //var entity = {
        //    "tag": "div",
        //    "content": [
        //        {
        //            "tag": "span",
        //            "attributes": {
        //                "style": "color: red"
        //            },
        //            "content": [
        //                { "text": "Enter value:" }
        //            ]
        //        },
        //        {
        //            "tag": "input", "attributes": {
        //                "type": "text",
        //                "value": "test",
        //                "style": "color: green"
        //            }
        //        }
        //    ]
        //};

        return this.http.get(this.apiUrl).map(response => {
            return <IDomNode>response.json();
        });
    };
}