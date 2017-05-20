import { Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http'
import { ITreeNode } from './filemanager.model'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const API_URL: string = "/api/SampleData/Files";

@Injectable()
export class FilesLoaderService {

    apiUrl:string = API_URL;

    constructor(private http: Http) {
    }

    public load(): Observable<ITreeNode[]> {
        return this.http.get(this.apiUrl).map(response => {
            return <ITreeNode[]>response.json();
        });
    };
}